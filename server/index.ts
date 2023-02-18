import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./server";

const { listen } = createHTTPServer({
	router: appRouter,
});

// The API will now be listening on port 3000!
listen(3001);
