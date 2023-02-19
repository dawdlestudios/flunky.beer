import { httpBatchLink, httpLink, splitLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../../server";
import { useStore } from "./state";

// Notice the <AppRouter> generic here.
export const trpc = createTRPCReact<AppRouter>();
export const TRPCProvider = trpc.Provider;

const url = "http://localhost:3001/api";

export const createTrpcClient = () =>
	trpc.createClient({
		links: [
			splitLink({
				condition: (op) => op.context.batch === true,
				true: httpBatchLink({ url }),
				false: httpLink({ url }),
			}),
		],
	});
