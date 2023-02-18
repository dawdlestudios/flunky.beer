import { Box } from "@chakra-ui/react";
import Header from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<Header />
			{children}
		</Box>
	);
};
