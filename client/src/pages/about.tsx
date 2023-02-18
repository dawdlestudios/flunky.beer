import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from "react-icons/io5";
import { ReactElement } from "react";

interface FeatureProps {
	text: string;
	iconBg: string;
	icon?: ReactElement;
}

import {
	Container,
	SimpleGrid,
	Image,
	Flex,
	Heading,
	Text,
	Stack,
	StackDivider,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
	return (
		<Stack direction={"row"} align={"center"}>
			<Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
				{icon}
			</Flex>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

export const AboutPage = () => {
	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" alignItems={"center"} display="flex">
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<Stack spacing={4}>
					<Text
						textTransform={"uppercase"}
						color={"blue.400"}
						fontWeight={600}
						fontSize={"sm"}
						bg={useColorModeValue("blue.50", "blue.900")}
						p={2}
						alignSelf={"flex-start"}
						rounded={"md"}
					>
						Unsere Story
					</Text>
					<Heading>Leidenschaftlich, Kompetent und Bier-Begeistert</Heading>
					<Text color={"gray.500"} fontSize={"lg"}>
						Wir sind ein engagiertes und eingespieltes Team, das aus begeisterten Bier-Trinkern und erfahrenen
						Entwicklern besteht. Unsere Leidenschaft für Bier und unser technisches Know-how haben uns
						zusammengeführt, um eine Website zu entwickeln, die das Bier- oder Flunkyball-Spielerlebnis auf
						eine neue Ebene hebt.
						<br />
						<br />
						Wir sind stolz darauf, Teil der Community zu sein und freuen uns darauf, unsere Leidenschaft und
						unser Wissen mit anderen Spielern zu teilen.
					</Text>
					{/* <Stack
						spacing={4}
						divider={<StackDivider borderColor={useColorModeValue("gray.100", "gray.700")} />}
					>
						<Feature
							icon={<Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />}
							iconBg={useColorModeValue("yellow.100", "yellow.900")}
							text={"Business Planning"}
						/>
						<Feature
							icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
							iconBg={useColorModeValue("green.100", "green.900")}
							text={"Financial Planning"}
						/>
						<Feature
							icon={<Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />}
							iconBg={useColorModeValue("purple.100", "purple.900")}
							text={"Market Analysis"}
						/>
					</Stack> */}
				</Stack>
				<Flex>
					<Image
						rounded={"md"}
						alt={"feature image"}
						src={
							"https://images.unsplash.com/photo-1595518107491-f80eb7f9881e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
						}
						objectFit={"cover"}
					/>
				</Flex>
			</SimpleGrid>
		</Container>
	);
};
