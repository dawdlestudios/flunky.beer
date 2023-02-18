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

export const EventsPage = () => {
	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" display="flex">
			<Flex flex={1} direction={"column"}>
				<Text variant={"heading"} fontSize={"4xl"} mb={4}>
					Events
				</Text>

				<SimpleGrid gap={10}>
					<Event />
					<Event />
					<Event />
					<Event />
				</SimpleGrid>
			</Flex>
		</Container>
	);
};

const Event = () => {
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
					<Heading size='md'>Test Event</Heading>

					<Text py='2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod</Text>
				</CardBody>
				<CardFooter>
					<Button variant='ghost' colorScheme='blue'>
						Details
					</Button>
				</CardFooter>
			</Stack>
		</Card>
	);
};
