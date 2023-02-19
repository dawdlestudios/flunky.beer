import {
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { RouteComponentProps } from "wouter";
import { SelectTeamModal } from "../components/select-team-modal";
import { useUser } from "../state";
import { trpc } from "../trpc";
const pug =
	"https://images.unsplash.com/photo-1529927066849-79b791a69825?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";

export const EventPage = ({
	params,
}: RouteComponentProps<{
	id: string;
}>) => {
	const data = trpc.event.getEvent.useQuery({ slug: params.id });
	const user = useUser((state) => state.user);
	const event = data.data?.event;

	const { isOpen, onClose, onOpen } = useDisclosure();

	const onJoinEvent = async (teamId: string) => {
		console.log("Joining event with team", teamId);
	};

	return (
		<Box minH="calc(100vh - 8rem)">
			<SelectTeamModal
				onSelected={onJoinEvent}
				isOpen={isOpen}
				onClose={onClose}
				teams={user?.teamMember.map((t) => t.team) ?? []}
			/>
			<Flex
				background={`linear-gradient(#fff0, #fff0, #ffffffeb, rgb(255, 255, 255)), url(${
					event?.pictureHeadding ?? pug
				})`}
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				minH="400px"
				w="100%"
				align={"flex-end"}
			>
				<Container maxW={"5xl"} py={12}>
					<Flex flex={1} direction={"row"} align={"center"} flexDirection={{ base: "column", md: "row" }}>
						<Avatar size={"2xl"} src={event?.picture ?? pug} mr={8} />
						<div>
							<Text variant={"heading"} fontSize={"4xl"}>
								{event?.name ?? "Loading..."}
							</Text>
							<Text>{event?.description}</Text>
							<Button colorScheme="blue" variant="outline" mt={4} onClick={onOpen}>
								Teilnehmen
							</Button>
						</div>
					</Flex>
				</Container>
			</Flex>
			<Container maxW={"5xl"} py={12} display="flex">
				<Tabs flex={1}>
					<TabList>
						<Tab>Details</Tab>
						<Tab>Teilnehmende Teams</Tab>
						<Tab>Rangliste</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<Text variant={"heading"} fontSize={"4xl"} mb={4}>
								Details
							</Text>
							<Text>{event?.description}</Text>
						</TabPanel>
						<TabPanel>
							<Text variant={"heading"} fontSize={"4xl"} mb={4}>
								Teilnehmer
							</Text>
						</TabPanel>
						<TabPanel>
							<Text variant={"heading"} fontSize={"4xl"} mb={4}>
								Rangliste
							</Text>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</Box>
	);
};
