import { User } from "@prisma/client";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { prisma } from "./prisma";
import { verifyJWT } from "./utils/auth";

export async function createContext({ req, res }: CreateHTTPContextOptions): Promise<{user?: User}> {
	// Create your context based on the request object
	// Will be available as `ctx` in all your resolvers

	// This is just an example of something you might want to do in your ctx fn
	if (req.headers.authorization) {
		const userID = verifyJWT(req.headers.authorization);
		let user: User;
		try {
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
	return {user: undefined};
}

export type Context = inferAsyncReturnType<typeof createContext>;
