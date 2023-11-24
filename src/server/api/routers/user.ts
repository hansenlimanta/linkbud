import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUsernames: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        username: true,
      },
    });
  }),

  updateUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
        },
      });
    }),

  updatePageTitle: protectedProcedure
    .input(z.object({ pageTitle: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          pageTitle: input.pageTitle,
        },
      });
    }),

  updateDescription: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          description: input.description,
        },
      });
    }),
});
