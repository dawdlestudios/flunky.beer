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

const coolGradient = `linear-gradient(180deg, rgb(99.608% 99.608% 99.608% / 0) 0%, rgb(99.655% 99.655% 99.655% / 0.12109375) 6.25%, rgb(99.7% 99.7% 99.7% / 0.234375) 12.5%, rgb(99.741% 99.741% 99.741% / 0.33984375) 18.75%, rgb(99.779% 99.779% 99.779% / 0.4375) 25%, rgb(99.815% 99.815% 99.815% / 0.52734375) 31.25%, rgb(99.847% 99.847% 99.847% / 0.609375) 37.5%, rgb(99.876% 99.876% 99.876% / 0.68359375) 43.75%, rgb(99.902% 99.902% 99.902% / 0.75) 50%, rgb(99.925% 99.925% 99.925% / 0.80859375) 56.25%, rgb(99.945% 99.945% 99.945% / 0.859375) 62.5%, rgb(99.962% 99.962% 99.962% / 0.90234375) 68.75%, rgb(99.975% 99.975% 99.975% / 0.9375) 75%, rgb(99.986% 99.986% 99.986% / 0.96484375) 81.25%, rgb(99.994% 99.994% 99.994% / 0.984375) 87.5%, rgb(99.998% 99.998% 99.998% / 0.99609375) 93.75%, rgb(100% 100% 100%) 100% )`;

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
				background={`${coolGradient}, url(${event?.pictureHeadding ?? pug})`}
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
