import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUserNames: protectedProcedure.query(({ ctx }) => {
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
});
