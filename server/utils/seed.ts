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
									TeamEvent: {
										connectOrCreate: {
											where: {
												id: "test-team-event-id",
											},
											create: {
												id: "test-team-event-id",
												role: "ADMIN",
												event: {
													connectOrCreate: {
														where: {
															id: "test-event-id",
														},
														create: {
															id: "test-event-id",
															description: "test",
															end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
															name: "test",
															public: true,
															slug: "test-event-slug",
															start: new Date(),
														},
													},
												},
											},
										},
									},
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

	await prisma.event.upsert({
		create: {
			id: "rar-event-id",
			description: `flunky.beer ist dieses Jahr auf dem Rock am Ring Festival dabei.\nWir freuen uns auf euch!`,
			end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			start: new Date(),
			name: "flunky.beer @ Rock am Ring",
			public: true,
			slug: "rock-am-ring-23",
			TeamEvent: {
				connectOrCreate: {
					where: {
						id: "rar-team-event-id",
					},
					create: {
						id: "rar-team-event-id",
						role: "ADMIN",
						teamID: "test-team-id",
					},
				},
			},
		},
		update: {},
		where: {
			id: "rar-event-id",
		},
	});
}

main();
