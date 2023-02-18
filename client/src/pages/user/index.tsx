import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { RouteComponentProps } from "wouter";
import ProfileCard from "./card";

export const UserPage = ({
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
				<ProfileCard
					displayName="test useer"
					username="test_user"
					teams={[
						{
							name: "test team",
							id: "test_team",
						},
					]}
				/>
				<Box paddingTop={"1rem"} paddingLeft="1rem">
					<Text fontWeight={"medium"} fontSize="2xl">
						Verlauf
					</Text>
				</Box>
			</SimpleGrid>
		</Container>
	);
};
