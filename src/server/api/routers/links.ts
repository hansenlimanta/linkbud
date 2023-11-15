import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getLinksById: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        position: "asc",
      },
    });
  }),

  getLinksByEndpoint: publicProcedure
    .input(z.object({ endpoint: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { urlEndpoint: input.endpoint },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User does not exist",
        });

      const links = await ctx.db.link.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          position: "asc",
        },
      });

      return { user, links };
    }),

  addLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
        position: z.number(),
        isActive: z.boolean(),
        type: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.link.create({
        data: {
          id: input.id,
          userId: ctx.session.user.id,
          title: input.title,
          url: input.url,
          isActive: input.isActive,
          type: input.type,
          position: input.position,
        },
      });
    }),

  deleteLink: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.link.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
        position: z.number(),
        title: z.string(),
        url: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.link.update({
        where: {
          id: input.id,
        },
        data: {
          isActive: input.isActive,
          position: input.position,
          title: input.title,
          url: input.url,
        },
      });
    }),
});
