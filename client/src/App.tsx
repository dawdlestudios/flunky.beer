import { Route } from "wouter";
import { Layout } from "./layout";
import { IndexPage } from "./pages";

function App() {
	return (
		<Layout>
			<Route path="/" component={IndexPage} />
		</Layout>
	);
}

export default App;
