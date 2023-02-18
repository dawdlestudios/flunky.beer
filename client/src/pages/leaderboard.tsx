import {
	Container,
	Flex,
	Tab,
	Table,
	TableContainer,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

export const LeaderboardPage = () => {
	return (
		<Container maxW={"5xl"} py={12} minH="calc(100vh - 8rem)" display="flex">
			<Flex flex={1} direction={"column"}>
				<Text variant={"heading"} fontSize={"4xl"} mb={4}>
					Leaderboard
				</Text>

				<Tabs flex={1} w="100%">
					<TabList mb="5">
						<Tab>Teams</Tab>
						<Tab>Users</Tab>
					</TabList>

					<TabPanels>
						<TabPanel padding={0}>
							<Leaderboard />
						</TabPanel>
						<TabPanel padding={0}>
							<Leaderboard />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Flex>
		</Container>
	);
};

const Leaderboard = () => {
	const teams = ["team1", "team2", "team3", "team4", "team5", "team6", "team7", "team8", "team9", "team10"];
	return (
		<TableContainer flex="1">
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th isNumeric>Place</Th>
						<Th width={"100%"}>Team</Th>
						<Th isNumeric>Points</Th>
					</Tr>
				</Thead>
				<Tbody>
					{teams.map((team, i) => (
						<Tr key={team}>
							<Td isNumeric>{i + 1}</Td>
							<Td>
								<Text ml={2}>
									{team} {i === 0 && "🏆"}
									{i === 1 && "🥈"}
									{i === 2 && "🥉"}
								</Text>
							</Td>
							<Td isNumeric>{Math.floor(Math.random() * 100 + (teams.length - i - 1) * 100)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
