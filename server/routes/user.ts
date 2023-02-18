import { router, publicProcedure, protectedProcedure } from "../server";
import { z } from "zod";
import { prisma, Team, TeamMember } from "../prisma";
import type { User } from "../prisma";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
	signUp: publicProcedure
		.input(
			z.object({
				username: z.string(),
			}),
		)
		.query(async ({ input }) => {
			let user: User & {
                TeamMember: (TeamMember & {
                    team: Team;
                })[];
            };;
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
				teams: user.TeamMember.map((tm) => {
          const teamInfo: publicTeamInfo = {
            id: tm.team.id,
            name: tm.team.name
          }
          return teamInfo
          
        }),
			};

			return { message: "success", user: userInfo };
		}),
});

type publicUserInfo = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	profilePicture: string;
	teams: publicTeamInfo[];
};

type publicTeamInfo = {
	id: string;
	name: string;
};
