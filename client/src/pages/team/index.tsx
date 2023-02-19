import { RouteComponentProps } from "wouter";
import { Avatar, Box, Button, Container, Flex, Text } from "@chakra-ui/react";

export const TeamPage = ({
	params,
}: RouteComponentProps<{
	id: string;
}>) => {
	const team = {
		id: "asdfasdfasdf",
		name: "Test Team",
		slug: "test-team",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut",
		picture: "https://picsum.photos/200",
		pictureHeading: "https://picsum.photos/1000/200",
		public: true,
		desciption: "lorem ipsum",
	};

	return (
		<Box minH="calc(100vh - 8rem)">
			<Flex
				background={`linear-gradient(#ffffff00, #ffffff00, rgb(255, 255, 255)), url(${team.pictureHeading})`}
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				minH="400px"
				w="100%"
				align={"flex-end"}
			>
				<Container maxW={"5xl"} py={12}>
					<Flex flex={1} direction={"row"} align={"center"} flexDirection={{ base: "column", md: "row" }}>
						<Avatar size={"2xl"} src={team.picture} mr={8} />
						<div>
							<Text variant={"heading"} fontSize={"4xl"}>
								{team.name}
							</Text>
							<Text>{team.description}</Text>
							<Button colorScheme="blue" variant="outline" mt={4}>
								Teilnehmen
							</Button>
						</div>
					</Flex>
				</Container>
			</Flex>
			<Container maxW={"5xl"} py={12} display="flex">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut</p>
			</Container>
		</Box>
	);
};
