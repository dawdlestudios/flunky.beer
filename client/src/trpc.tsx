import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server/server";
import { useStore } from "./state";

// Notice the <AppRouter> generic here.
export const trpc = createTRPCReact<AppRouter>({});
export const TRPCProvider = trpc.Provider;

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:3001/trpc",
			headers() {
				return {
					authorization: useStore.getState().token,
				};
			},
		}),
	],
});
