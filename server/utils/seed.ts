import { prisma } from "../prisma";

async function main() {
	await prisma.user.upsert({
		create: {
			id: "test-user-id",
			role: "ADMIN",
			email: "test@test.test",
			preference: "BIER_BALL",
			password: "test",
			displayName: "Test",
			username: "test",
			bio: "test bio",
			contact: "test contact",
			profilePicture: "https://i.imgur.com/1ZQZQ9r.png",
			TeamMember: {
				connectOrCreate: {
					where: {
						id: "test-team-member-id",
					},
					create: {
						id: "test-team-member-id",
						team: {
							connectOrCreate: {
								create: {
									id: "test-team-id",
									name: "Test Team",
									contact: "test contact",
									slug: "Test",
									description: "Test",
									picture: "Test",
									pictureHeadding: "Test",
								},
								where: {
									id: "test-team-id",
								},
							},
						},
						nickName: "Test",
						role: "ADMIN",
					},
				},
			},
		},
		update: {},
		where: {
			id: "test-user-id",
		},
	});
}

main();
