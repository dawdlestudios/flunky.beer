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
} from "@chakra-ui/react";
import { RouteComponentProps } from "wouter";
import { trpc } from "../trpc";
const pug =
	"https://images.unsplash.com/photo-1529927066849-79b791a69825?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";

export const EventPage = ({
	params,
}: RouteComponentProps<{
	id: string;
}>) => {
	const data = trpc.event.getEvent.useQuery({ slug: params.id });
	const event = data.data?.event;

	console.log(data.isLoading);

	return (
		<Box minH="calc(100vh - 8rem)">
			<Flex
				background={`linear-gradient(#ffffff00, #ffffff00, rgb(255, 255, 255)), url(${
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
							<Button colorScheme="blue" variant="outline" mt={4}>
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
