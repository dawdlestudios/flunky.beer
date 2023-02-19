import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma, Event } from "../prisma";
import { TRPCError } from "@trpc/server";

export const eventRouter = router({
	getEvents: publicProcedure
		.input(
			z.object({
				// only allow alphanumeric usernames, _ or - and no spaces (between 3 and 20 characters)
				ofset: z.number(),
				limit: z.number().max(50),
			}),
		)
		.query(async ({ input }) => {
			const events = await prisma.event.findMany({
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
	getEvent: publicProcedure
		.input(
			z.object({
				// only allow alphanumeric usernames, _ or - and no spaces (between 3 and 20 characters)
				slug: z.string(),
			}),
		)
		.query(async ({ input }) => {
			let event: Event;
			try {
				event = await prisma.event.findUniqueOrThrow({
					where: {
						slug: input.slug,
					},
					include: {
						TeamEvent: {
							select: {
								id: true,
								role: true,
								team: {
									select: {
										id: true,
										slug: true,
										name: true,
									},
								},
							},
						},
					},
				});
			} catch (e) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Event with slug does not exist", cause: e });
			}
			return { message: "success", event };
		}),
});
