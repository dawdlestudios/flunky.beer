import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../prisma";
import type { User } from "../prisma";
import argon2 from "argon2";
import { createJWT } from "../utils/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
	signUp: publicProcedure
		.input(
			z.object({
				// only allow alphanumeric usernames, _ or - and no spaces (between 3 and 20 characters)
				username: z.string().regex(/^[a-zA-Z0-9_-]{3,20}$/),
				email: z.string().email(),
				password: z.string().min(8),
			}),
		)
		.mutation(async ({ input }) => {
			const hashedPass = await argon2.hash(input.password);

			const user = await prisma.user.create({
				data: {
					email: input.email,
					username: input.username.toLowerCase(),
					displayName: input.username,
					password: hashedPass,
					bio: "",
					contact: "",
					profilePicture: "",
					role: "USER",
				},
			});

			const token = createJWT(user.id);

			return { message: "success", username: user.username, token };
		}),
	signIn: publicProcedure
		.input(
			z.object({
				email: z.string(),
				password: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			let user: User;
			try {
				user = await prisma.user.findUniqueOrThrow({
					where: {
						email: input.email,
					},
				});
			} catch (e) {
				throw new TRPCError({ code: "UNAUTHORIZED", message: "Email does not exist", cause: e });
			}

			const validPassword: boolean = await argon2.verify(user.password, input.password);

			if (validPassword) {
				const token = createJWT(user.id);
				return { message: "success", username: user.username, token };
			}
			throw new TRPCError({ code: "UNAUTHORIZED", message: "" });
		}),
});
