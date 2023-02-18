import { Container, SimpleGrid, Stack } from "@chakra-ui/react";

export const LeaderboardPage = () => {
	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" alignItems={"center"} display="flex">
			<SimpleGrid
				columns={{
					sm: 1,
					md: 2,
				}}
				spacing={10}
			>
				<h1>Leaderboard</h1>
			</SimpleGrid>
		</Container>
	);
};
