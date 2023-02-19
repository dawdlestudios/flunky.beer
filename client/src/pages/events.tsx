import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Container,
	Flex,
	Heading,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Link } from "wouter";
import { Event } from "../../../server/prisma";
import { trpc } from "../trpc";

export const EventsPage = () => {
	const data = trpc.event.getEvents.useQuery({ limit: 20, ofset: 0 });

	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" display="flex">
			<Flex flex={1} direction={"column"}>
				<Text variant={"heading"} fontSize={"4xl"} mb={4}>
					Events
				</Text>

				<SimpleGrid gap={10}>
					{data.data?.events?.map?.((event) => {
						return <Event event={event} />;
					})}
				</SimpleGrid>
			</Flex>
		</Container>
	);
};

const Event = ({ event }: { event: Omit<Event, "start" | "end"> & { start: string; end: string } }) => {
	return (
		<Card direction={{ base: "column", md: "row" }} overflow='hidden' variant='filled'>
			<Image
				objectFit='cover'
				maxW={{ base: "100%", md: "200px" }}
				src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
				alt='Caffe Latte'
			/>

			<Stack>
				<CardBody>
					<Heading size='md'>{event.name}</Heading>
					<Text py='2'>{event.description}</Text>
				</CardBody>
				<CardFooter>
					<Link href={`/event/${event.slug}`}>
						<Button variant='ghost' colorScheme='blue'>
							Details
						</Button>
					</Link>
				</CardFooter>
			</Stack>
		</Card>
	);
};
