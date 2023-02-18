import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export { protectedProcedure } from "./middlewares/auth";

export const appRouter = router({});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
