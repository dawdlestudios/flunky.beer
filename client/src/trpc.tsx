import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server";
import { useStore } from "./state";

// Notice the <AppRouter> generic here.
export const trpc = createTRPCReact<AppRouter>();
export const TRPCProvider = trpc.Provider;

export const createTrpcClient = () =>
	trpc.createClient({
		links: [
			httpBatchLink({
				url: "http://localhost:3001/api",
				headers() {
					const { token } = useStore.getState();
					if (!token) return {};
					return {
						authorization: `Bearer ${token}`,
					};
				},
			}),
		],
	});
