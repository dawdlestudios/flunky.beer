import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createContext } from "./context";
import { appRouter } from "./server";

const { listen } = createHTTPServer({
	router: appRouter,
	createContext,
});

// The API will now be listening on port 3000!
listen(3001);
