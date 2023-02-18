import "./App.css";
import { Route } from "wouter";
import { IndexPage } from "./pages";

function App() {
	return (
		<div>
			<Route path="/" component={IndexPage} />
		</div>
	);
}

export default App;
