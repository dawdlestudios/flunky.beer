import { initTRPC } from "@trpc/server";

const t = initTRPC.create({});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

 
 
