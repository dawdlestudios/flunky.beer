import { User } from "@prisma/client";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "./prisma";
import { verifyJWT } from "./utils/auth";

export async function createContext({ req, res }: CreateExpressContextOptions): Promise<{ user?: User }> {
	if (req.headers.authorization) {
		let user: User;
		try {
			const userID = verifyJWT(req.headers.authorization.replace("Bearer ", ""));
			user = await prisma.user.findUniqueOrThrow({
				where: {
					id: userID,
				},
			});
		} catch (e) {
			throw new TRPCError({ code: "UNAUTHORIZED", message: "userId from JWT does not exist", cause: e });
		}
		return { user };
	}
	return { user: undefined };
}

export type Context = inferAsyncReturnType<typeof createContext>;
