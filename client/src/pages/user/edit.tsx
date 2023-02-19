import {
	Avatar,
	Button,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Radio,
	RadioGroup,
	SimpleGrid,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { useUser } from "../../state";

export const EditProfilePage = () => {
	const user = useUser();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submit");
	};

	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" display="flex" flexDir={"column"}>
			<Flex direction={"column"}>
				<Text variant={"heading"} fontSize={"4xl"} mb={4}>
					Profil bearbeiten
				</Text>
			</Flex>

			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<form onSubmit={handleSubmit}>
					<Stack spacing={4}>
						{/* <FormControl isInvalid={!!mutation.error}>
						<FormErrorMessage>{mutation.error?.message || mutation.error?.data?.code}</FormErrorMessage>
					</FormControl> */}
						<FormControl id="username">
							<FormLabel>Nutzername</FormLabel>
							<InputGroup>
								<InputLeftAddon>@</InputLeftAddon>
								<Input name="username" type="text" />
							</InputGroup>
						</FormControl>
						<FormControl id="displayname">
							<FormLabel>Anzeigename</FormLabel>
							<Input name="displayname" type="text" />
						</FormControl>
						<FormControl id="contact">
							<FormLabel>Kontakt</FormLabel>
							<FormHelperText mb={2}>
								Deine Kontaktdaten sind nur für Nutzer, denen du folgst, sichtbar.
							</FormHelperText>
							<Textarea maxLength={1000} name="contact" />
						</FormControl>

						<FormControl id="bio">
							<FormLabel>Bio</FormLabel>
							<Textarea maxLength={1000} name="bio" />
						</FormControl>

						<FormControl id="contact">
							<FormLabel>Bezeichnung für das Spiel</FormLabel>
							<RadioGroup name="preference">
								<Stack direction='row' gap="3">
									<Radio value='flunkyball'>Flunkyball</Radio>
									<Radio value='bierball'>Bierball</Radio>
								</Stack>
							</RadioGroup>
						</FormControl>

						<Stack spacing={10}>
							<Button
								type="submit"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Speichern
							</Button>
						</Stack>
					</Stack>
				</form>
				<Flex direction={"column"} alignItems={"center"}>
					<Button flexDirection={"column"} gap={3} variant={"link"} mt={4} colorScheme={"blue"}>
						<Avatar size={"2xl"} />
						Avatar ändern
					</Button>
				</Flex>
			</SimpleGrid>
		</Container>
	);
};
