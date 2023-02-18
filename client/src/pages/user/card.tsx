import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Button,
	Link as ChakraLink,
	Badge,
	useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "wouter";

export type ProfileCardProps = {
	username: string;
	displayName: string;
	avatar?: string;
	bio?: string;
	teams: {
		id: string;
		name: string;
	}[];
};

export default function ProfileCard({ username, displayName, avatar, teams, bio }: ProfileCardProps) {
	return (
		<Center py={6}>
			<Box
				maxW={"320px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={6}
				textAlign={"center"}
				minW={"18rem"}
			>
				<Avatar
					size={"xl"}
					src={
						avatar ||
						"https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					}
					mb={4}
					pos={"relative"}
					_after={{
						content: '""',
						w: 4,
						h: 4,
						bg: "green.300",
						border: "2px solid white",
						rounded: "full",
						pos: "absolute",
						bottom: 0,
						right: 3,
					}}
				/>
				<Heading fontSize={"2xl"} fontFamily={"body"}>
					{displayName}
				</Heading>
				<Text fontWeight={600} color={"gray.500"} mb={4}>
					@{username}
				</Text>
				<Text textAlign={"center"} color={useColorModeValue("gray.700", "gray.400")} px={3}>
					{bio}
				</Text>

				<Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
					{teams.map((team) => (
						<Link key={team.id} href={`/team/${team.id}`}>
							<a href={`/team/${team.id}`}>
								<Badge px={2} py={1} bg={useColorModeValue("gray.50", "gray.800")} fontWeight={"400"}>
									{team.name}
								</Badge>
							</a>
						</Link>
					))}
				</Stack>

				<Stack mt={8} direction={"row"} spacing={4}>
					<Button
						flex={1}
						fontSize={"sm"}
						rounded={"full"}
						bg={"blue.400"}
						color={"white"}
						boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
						_hover={{
							bg: "blue.500",
						}}
						_focus={{
							bg: "blue.500",
						}}
					>
						Herausfordern
					</Button>
				</Stack>
			</Box>
		</Center>
	);
}
