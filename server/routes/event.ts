import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../prisma";

export const eventRouter = router({
	getEvents: publicProcedure
		.input(
			z.object({
				// only allow alphanumeric usernames, _ or - and no spaces (between 3 and 20 characters)
				ofset: z.number(),
				limit: z.number().max(50),
			}),
		)
		.mutation(async ({ input }) => {
			const events = prisma.event.findMany({
				where: {
					public: true,
					end: {
						gte: new Date(),
					},
				},
				orderBy: {
					start: "asc",
				},
				skip: input.ofset,
				take: input.limit,
			});

			return { message: "success", events };
		}),
});
