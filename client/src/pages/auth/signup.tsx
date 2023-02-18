import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "wouter";

export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Registriere dich
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<Box>
							<FormControl id="username" isRequired>
								<FormLabel>Nutzername</FormLabel>
								<Input type="text" placeholder="z.B Bierkönig" />
							</FormControl>
						</Box>
						<FormControl id="email" isRequired>
							<FormLabel>E-Mail Adresse</FormLabel>
							<Input placeholder="z.B. bierkoenig@aol.com" type="email" />
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Passwort</FormLabel>
							<InputGroup>
								<Input placeholder="z.B. 123456" type={showPassword ? "text" : "password"} />
								<InputRightElement h={"full"}>
									<Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Registrieren
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Du hast schon ein Konto? <Link href="/login">Anmelden</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
