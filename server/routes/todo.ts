import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const todoRouter = router({

    
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
          const todos = await ctx.prisma.todo.findMany();
          return todos;
        } catch (error) {
          console.error('Error fetching todos:', error);
          throw new Error('Failed to fetch todos');
        }
      }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.todo.findUnique({ where: { id: input } });
    }),
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({ data: input });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.todo.update({ where: { id }, data });
    }),
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({ where: { id: input } });
    }),
});
