import { Container, Flex, Text } from "@chakra-ui/react";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useUser } from "../../state";

export const MePage = () => {
	useAuthRedirect(true);
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
