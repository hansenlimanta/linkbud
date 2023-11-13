import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getLinksById: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      where: {
        userId: ctx.session.user.id,
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
      });

      return { user, links };
    }),

  addLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
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
});
