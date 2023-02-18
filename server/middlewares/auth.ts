import { TRPCError } from "@trpc/server";
import { Context } from "../context";
import { middleware, publicProcedure } from "../trpc";

const isAuthed = middleware(({ ctx, next }) => {
	// `ctx.user` is nullable
	if (!(ctx as Context).user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			// user value is known to be non-null now
			user: (ctx as Context).user,
		},
	});
});

export const protectedProcedure = publicProcedure.use(isAuthed);
