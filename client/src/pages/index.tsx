import { DefaultParams, Link, RouteComponentProps } from "wouter";
import { Button, Flex, Heading, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export const IndexPage = ({ params }: RouteComponentProps<DefaultParams>) => {
	return (
		<Stack minH={"calc(100vh - 8rem)"} direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: useBreakpointValue({ base: "20%", md: "30%" }),
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: "blue.400",
								zIndex: -1,
							}}
						>
							Competetive Drinking
						</Text>
						<br />{" "}
						<Text color={"blue.400"} as={"span"}>
							Redefined
						</Text>{" "}
					</Heading>
					<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
						Prost! Mach dich bereit für das ultimative Turnier!
					</Text>
					<Stack direction={{ base: "column", md: "row" }} spacing={4}>
						<Link href="/signup">
							<Button
								rounded={"full"}
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Registrieren
							</Button>
						</Link>
						<Link href="/login">
							<Button rounded={"full"}>Anmelden</Button>
						</Link>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					maxH={"calc(100vh - 8rem)"}
					src={
						"https://images.unsplash.com/photo-1600366060302-9fb7682b062b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJlZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
					}
				/>
			</Flex>
		</Stack>
	);
};
