import { createContext } from "./context";

import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { router } from "./trpc";

import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { cors } from "./middlewares/cors";
import { eventRouter } from "./routes/event";

export const appRouter = router({
	user: userRouter,
	auth: authRouter,
	event: eventRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app = express();

app.use(cors);

app.use(
	"/api",
	createExpressMiddleware({
		router: appRouter,
		onError({ error, ctx, type }) {
			if (error.message.startsWith("[")) {
				try {
					const json = JSON.parse(error.message);
					if (json?.[0]?.message) {
						error.message = json?.[0]?.message;
					}
				} catch (e) {}
			}

			error.message ??= "Something went wrong";
		},

		createContext,
	}),
);

// The API will now be listening on port 3000!
app.listen(3001);
