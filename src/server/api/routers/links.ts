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

  getLinks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.link.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
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
      ctx.db.link.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
