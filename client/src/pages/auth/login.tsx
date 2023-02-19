import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "wouter";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useStore } from "../../state";
import { trpc } from "../../trpc";

export default function LoginPage() {
  useAuthRedirect()

  const mutation = trpc.auth.signIn.useMutation();
  const login = useStore((state) => state.login);
  const [, setLocation] = useLocation();

  const handleLoginSuccess = (token: string, username: string) => {
    login(token);
    setLocation(`/user/${username}`);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    let email = form.get("email");
    let password = form.get("password");

    if (!(email && password) || typeof email !== "string" || typeof password !== "string")
      throw new Error("Missing email or password");

    await mutation.mutate(
      { email, password: password },
      { onSuccess: (data) => handleLoginSuccess(data.token, data.username) },
    );
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
          <Heading fontSize={"4xl"}>Melde dich an</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmitForm}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" />
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
                  Anmelden
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Du hast noch keine Konto? <Link href="/signup">Registrieren</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
