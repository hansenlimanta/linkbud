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
    });
  }),

  getLinksByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { username: input.username },
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

      const theme = await ctx.db.theme.findFirst({
        where: {
          userId: user.id,
        },
      });

      return { user, links, theme };
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

  updateLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
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
          title: input.title,
          url: input.url,
        },
      });
    }),

  // Sementara jangan dipake dulu karena masih pake sqlite ========================
  updateLinksArray: protectedProcedure
    .input(
      z
        .object({
          id: z.string(),
          isActive: z.boolean(),
          title: z.string(),
          url: z.string(),
        })
        .array(),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = input.map(async (link) => {
          return await ctx.db.link.update({
            where: {
              id: link.id,
            },
            data: {
              isActive: link.isActive,
              title: link.title,
              url: link.url,
            },
          });
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    }),
});
