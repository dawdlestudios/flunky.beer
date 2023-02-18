import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export { protectedProcedure } from "./middlewares/auth";

export const appRouter = router({
	user: userRouter,
	auth: authRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
