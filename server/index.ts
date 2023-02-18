import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createContext } from "./context";

import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { router } from "./trpc";

export const appRouter = router({
	user: userRouter,
	auth: authRouter,
});

const { listen } = createHTTPServer({
	router: appRouter,
	createContext,
});

// The API will now be listening on port 3000!
listen(3001);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
