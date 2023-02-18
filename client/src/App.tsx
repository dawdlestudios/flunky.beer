import { Route } from "wouter";
import { Layout } from "./layout";
import { IndexPage } from "./pages";
import { AboutPage } from "./pages/about";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import { EventsPage } from "./pages/events";
import { LeaderboardPage } from "./pages/leaderboard";

function App() {
	return (
		<Layout>
			<Route path="/" component={IndexPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/signup" component={SignupPage} />
			<Route path="/leaderboard" component={LeaderboardPage} />
			<Route path="/events" component={EventsPage} />
			<Route path="/about" component={AboutPage} />
		</Layout>
	);
}

export default App;
