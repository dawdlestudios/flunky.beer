import { router, publicProcedure, protectedProcedure } from "../server";
import { z } from "zod";
import { prisma } from "../prisma";
import type { User, Team } from "../prisma";
import { TRPCError } from "@trpc/server";


export const userRouter = router({
	signUp: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
		.query(async ({ input }) => {

			let user: User;
      try {
				user = await prisma.user.findUniqueOrThrow({
					where: {
						username: input.username,
					},
          include: {
            TeamMember: {
              include: {
                team: true
              }
            }
          }
				});
			} catch (e) {
				throw new TRPCError({ code: "NOT_FOUND", message: "User with username does not exist", cause: e });
			}

      
      const teams =       


      const userInfo: publicUserInfo = {
        id : user.id,
        username : user.username,
        displayName : user.displayName,
        bio : user.bio,
        profilePicture : user.profilePicture,
        teams : [],
      }



			return { message: "success" };
		}),
});


type publicUserInfo = {
  id: string
  username: string,
  displayName: string,
  bio: string,
  profilePicture: string,
  teams: publicTeamInfo[],
}

type publicTeamInfo = {
  id: string
  name: string,
}
