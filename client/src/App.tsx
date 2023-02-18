import { useState } from "react";
import { Route } from "wouter";
import { Layout } from "./layout";
import { IndexPage } from "./pages";
import { AboutPage } from "./pages/about";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import { EventsPage } from "./pages/events";
import { LeaderboardPage } from "./pages/leaderboard";
import { UserPage } from "./pages/user";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTrpcClient, TRPCProvider } from "./trpc";
import { TeamPage } from "./pages/team";
import { useSyncUser } from "./state";
import { EventPage } from "./pages/event";

function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(createTrpcClient);

	return (
		<TRPCProvider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</TRPCProvider>
	);
}

function Router() {
	useSyncUser();

	return (
		<>
			<Layout>
				<Route path="/" component={IndexPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/leaderboard" component={LeaderboardPage} />
				<Route path="/events" component={EventsPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/user/:id" component={UserPage} />
				<Route path="/team/:id" component={TeamPage} />
				<Route path="/event/:id" component={EventPage} />
			</Layout>
		</>
	);
}

export default App;
