import { Box } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<Header />
			{children}
			<Footer />
		</Box>
	);
};
