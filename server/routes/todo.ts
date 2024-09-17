import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const todoRouter = router({

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const todos = await ctx.prisma.todo.findMany();
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Failed to fetch todos");
    }
  }),

  getByid: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    try {
      const todo = ctx.prisma.todo.findUnique({ where: { id: input } });
      return todo;
    } catch (error) {
      console.error("Error fetching todo:", error);
      throw new Error("Failed to fetch todo");
    }
  }),

  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const todo = ctx.prisma.todo.create({ data: input });
        return todo;
      } catch (error) {
        console.error("Error creating todo:", error);
        throw new Error("Failed to create todo");
      }
    }),


  update: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        const todo = ctx.prisma.todo.update({ where: { id }, data });
        return todo;
      } catch (error) {
        console.error("Error updating todo:", error);
        throw new Error("Failed to update todo");
      }
    }),

    delete : publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
      try {
        const todo = ctx.prisma.todo.delete({ where: { id: input } });
        return todo;
      } catch (error) {
        console.error("Error deleting todo:", error);
        throw new Error("Failed to delete todo");
      }
    }),

});
