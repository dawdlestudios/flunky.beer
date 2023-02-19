import {
	Box,
	chakra,
	Container,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { Link } from "wouter";

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Flex>
					<Flex align="center">
						<Text>Made with 🍻 in Berlin</Text>
					</Flex>
					<Box width={3} />
					<Link href="/about">
						<ChakraLink px={2} py={1} rounded={"md"} color={"black"}>
							Über uns
						</ChakraLink>
					</Link>
					<ChakraLink
						px={2}
						py={1}
						rounded={"md"}
						color={"black"}
						target={"_blank"}
						href="https://henrygressmann.de/impressum"
					>
						Impressum/Privacy Policy
					</ChakraLink>
				</Flex>
				<Stack direction={"row"} spacing={6}>
					<SocialButton label={"Twitter"} href={"#"}>
						<FaTwitter />
					</SocialButton>
					<SocialButton label={"YouTube"} href={"#"}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={"Instagram"} href={"#"}>
						<FaInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
