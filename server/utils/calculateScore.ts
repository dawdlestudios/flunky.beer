import { prisma } from "../prisma";

export async function calculateTeamEventScore(teamID: string, eventID: string) {
	const matches = await prisma.match.findMany({
		where: {
			eventId: eventID,
			MatchParticipants: {
				some: {
					teamID: teamID,
				},
			},
		},
		include: {
			MatchParticipants: true,
		},
	});

	matches.reduce((acc, m) => {
		const winners = m.MatchParticipants.map((mp) => mp.winner).filter(Boolean);
		if (winners.length === 0) {
			return acc;
		}
		if (winners.every((w) => w === winners[0])) {
			if (winners[0] === teamID) {
				return acc - 1;
			} else {
				return acc - 1;
			}
		}
		return acc;
	}, 0);
}

export async function calculateTeamScore(teamID: string) {
	const matches = await prisma.match.findMany({
		where: {
			MatchParticipants: {
				some: {
					teamID: teamID,
				},
			},
		},
		include: {
			MatchParticipants: true,
		},
	});

	matches.reduce((acc, m) => {
		const winners = m.MatchParticipants.map((mp) => mp.winner).filter(Boolean);
		if (winners.length === 0) {
			return acc;
		}
		if (winners.every((w) => w === winners[0])) {
			if (winners[0] === teamID) {
				return acc - 1;
			} else {
				return acc - 1;
			}
		}
		return acc;
	}, 0);
}
