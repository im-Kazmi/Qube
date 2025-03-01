import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.flow.findMany();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {}),

  create: protectedProcedure
    // .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      // return ctx.db.insert(Post).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    // return ctx.db.delete(Post).where(eq(Post.id, input));
  }),
} satisfies TRPCRouterRecord;
