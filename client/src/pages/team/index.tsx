import { Container, SimpleGrid } from "@chakra-ui/react";
import { RouteComponentProps } from "wouter";

export const TeamPage = ({
	params,
}: RouteComponentProps<{
	id: string;
}>) => {
	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" alignItems={"center"} display="flex">
			<SimpleGrid
				columns={{
					sm: 1,
					md: 2,
				}}
				spacing={10}
			>
				<h1>Team {params.id}</h1>
			</SimpleGrid>
		</Container>
	);
};
