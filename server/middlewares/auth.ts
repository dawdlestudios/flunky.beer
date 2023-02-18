import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";

export const isAuthed = middleware(({ ctx, next }) => {
	if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
	return next({ ctx: { user: ctx.user! } });
});

export const protectedProcedure = publicProcedure.use(isAuthed);
