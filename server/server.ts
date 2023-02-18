import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
