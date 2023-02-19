import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	FormErrorMessage,
} from "@chakra-ui/react";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "wouter";

import { trpc } from "../../trpc";
import { useStore } from "../../state";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

export default function SignupPage() {
	useAuthRedirect();

	const [showPassword, setShowPassword] = useState(false);
	const mutation = trpc.auth.signUp.useMutation();
	const login = useStore((state) => state.login);
	const [, setLocation] = useLocation();

	const handleSignupSuccess = (token: string, username: string) => {
		login(token);
		setLocation(`/user/${username}`);
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target as HTMLFormElement);
		let email = form.get("email");
		let username = form.get("username");
		let password = form.get("password");

		if (
			!(email && password && username) ||
			typeof email !== "string" ||
			typeof password !== "string" ||
			typeof username !== "string"
		)
			throw new Error("Invalid username, email or password");

		const result = await mutation.mutateAsync({ email, password, username });
		if (result) handleSignupSuccess(result.token, result.username);
	};

	return (
		<Flex
			minH={"calc(100vh - 8rem)"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Registriere dich
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
					<form onSubmit={handleSubmitForm}>
						<Stack spacing={4}>
							<FormControl isInvalid={!!mutation.error}>
								<FormErrorMessage>{mutation.error?.message || mutation.error?.data?.code}</FormErrorMessage>
							</FormControl>
							<Box>
								<FormControl id="username" isRequired>
									<FormLabel>Nutzername</FormLabel>
									<Input
										required
										name="username"
										// allow alphanumeric characters, underscores and dashes
										pattern="^[a-zA-Z0-9_-]+$"
										type="text"
										placeholder="z.B Bierkönig"
									/>
								</FormControl>
							</Box>
							<FormControl id="email" isRequired>
								<FormLabel>E-Mail Adresse</FormLabel>
								<Input
									name="email"
									placeholder="z.B. bierkoenig@aol.com"
									type="email"
									pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
									required
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Passwort</FormLabel>
								<InputGroup>
									<Input
										name="password"
										required
										minLength={8}
										placeholder="z.B. 123456"
										type={showPassword ? "text" : "password"}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() => setShowPassword((showPassword) => !showPassword)}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									type="submit"
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
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
