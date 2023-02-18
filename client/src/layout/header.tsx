import { ReactNode } from "react";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Link as ChakraLink,
	Text,
	Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "wouter";
import { useStore } from "../state";

const links = [
	{
		href: "/leaderboard",
		label: "Leaderboard",
	},
	{
		href: "/events",
		label: "Events",
	},
];

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
	<Link href={href}>
		<ChakraLink
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
		>
			{children}
		</ChakraLink>
	</Link>
);

export default function Header() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [authenticated, logout] = useStore((state) => [state.authenticated, state.logout]);

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Link href={"/"}>
							<Box cursor={"pointer"} display={"flex"} alignItems="center" flexDirection={"row"}>
								<Text>Bier.cool&nbsp;</Text>
								<Text fontSize={35}>🍻</Text>
							</Box>
						</Link>{" "}
						<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
							{links.map(({ href, label }) => (
								<NavLink key={href} href={href}>
									{label}
								</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						{authenticated ? (
							<Menu>
								<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
									<Avatar
										size={"sm"}
										src={
											"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
										}
									/>
								</MenuButton>
								<MenuList>
									<MenuItem>Profil</MenuItem>
									<MenuItem>Teams</MenuItem>
									<MenuDivider />
									<MenuItem
										onClick={() => {
											logout();
											window.location.replace("/");
										}}
									>
										Abmelden
									</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<>
								<Link href={"/login"}>
									<Button fontSize={"sm"} fontWeight={400} variant={"link"}>
										Anmelden
									</Button>
								</Link>
								<Box width={4} />
								<Link href={"/signup"}>
									<Button colorScheme='blue' variant={"solid"} fontWeight={500}>
										Registrieren
									</Button>
								</Link>
							</>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{links.map(({ href, label }) => (
								<NavLink key={href} href={href}>
									{label}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
