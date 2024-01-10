import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUsernames: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        username: true,
      },
    });
  }),

  getUserAndTheme: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User does not exist",
      });

    const theme = await ctx.db.theme.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!theme)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Theme does not exist",
      });

    return { user, theme };
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

  createDefaultTheme: protectedProcedure.mutation(({ ctx }) => {
    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        theme: {
          create: {
            id: ctx.session.user.id,
            key: "default",
            background: "#ffffff",
            buttonStyle: "#000000",
            typeface: "sans-serif",
          },
        },
      },
    });
  }),

  updateUserTheme: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        background: z.string(),
        buttonStyle: z.string(),
        typeface: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          theme: {
            update: {
              key: input.key,
              background: input.background,
              buttonStyle: input.buttonStyle,
              typeface: input.typeface,
            },
          },
        },
      });
    }),
});
