import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { RouteComponentProps } from "wouter";
import { trpc } from "../../trpc";
import ProfileCard from "./card";

export const UserPage = ({
	params,
}: RouteComponentProps<{
	id: string;
}>) => {
	const user = trpc.user.getUser.useQuery({ username: params.id });

	if (user.isLoading)
		return (
			<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" alignItems={"center"} display="flex">
				<Text fontWeight={"medium"} fontSize="2xl">
					Loading...
				</Text>
			</Container>
		);

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
					displayName={user.data?.user.displayName ?? ""}
					username={user.data?.user.username ?? ""}
					teams={
						user.data?.user.TeamMember.map(({ team }) => ({
							name: team.name,
							id: team.id,
						})) ?? []
					}
				/>
				<Box paddingTop={"1rem"} paddingLeft="1rem">
					<Text fontWeight={"medium"} fontSize="2xl">
						Verlauf
					</Text>
					<Text fontSize="sm" color="gray.500">
						Noch keine Einträge
					</Text>
				</Box>
			</SimpleGrid>
		</Container>
	);
};
