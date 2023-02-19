import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma, Team, TeamMember } from "../prisma";
import type { User } from "../prisma";
import { TRPCError } from "@trpc/server";
import { publicTeamMemberInfo, publicUserInfo } from "../types";
import { protectedProcedure } from "../middlewares/auth";

export const userRouter = router({
	getUser: publicProcedure
		.input(
			z.object({
				username: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			let user: User & {
				TeamMember: (TeamMember & {
					team: Team;
				})[];
			};

			try {
				user = await prisma.user.findUniqueOrThrow({
					where: {
						username: input.username,
					},
					include: {
						TeamMember: {
							include: {
								team: true,
							},
						},
					},
				});
			} catch (e) {
				throw new TRPCError({ code: "NOT_FOUND", message: "User with username does not exist", cause: e });
			}

			const userInfo: publicUserInfo = {
				id: user.id,
				username: user.username,
				displayName: user.displayName,
				bio: user.bio,
				profilePicture: user.profilePicture,
				preference: user.preference,
				TeamMember: user.TeamMember.map((tm) => {
					const teamInfo: publicTeamMemberInfo = {
						id: tm.id,
						nickName: tm.team.name,
						role: tm.role,
						team: {
							id: tm.team.id,
							name: tm.team.name,
						},
					};
					return teamInfo;
				}),
			};

			return { message: "success", user: userInfo };
		}),
	getMe: protectedProcedure.query(async ({ ctx }) => {
		const user = await prisma.user.findUnique({
			where: {
				id: ctx.user!.id,
			},
			select: {
				id: true,
				username: true,
				displayName: true,
				bio: true,
				contact: true,
				profilePicture: true,
				role: true,
				preference: true,
				TeamMember: {
					select: {
						id: true,
						nickName: true,
						role: true,
						team: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
				followers: {
					select: {
						id: true,
						username: true,
						displayName: true,
						bio: true,
						contact: true,
						profilePicture: true,
						preference: true,
						TeamMember: {
							select: {
								id: true,
								nickName: true,
								role: true,
								team: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
				follows: {
					select: {
						id: true,
						username: true,
						displayName: true,
						bio: true,
						profilePicture: true,
						preference: true,
						TeamMember: {
							select: {
								id: true,
								nickName: true,
								role: true,
								team: {
									select: {
										id: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return { message: "success", user };
	}),
});
