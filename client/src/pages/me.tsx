import { Container, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../state";

export const MePage = () => {
	const user = useUser();

	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" display="flex">
			<Flex flex={1} direction={"column"}>
				<Text variant={"heading"} fontSize={"4xl"} mb={4}>
					Me
				</Text>
			</Flex>
		</Container>
	);
};
