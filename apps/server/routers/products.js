import z from "zod";
import { protectedProcedure, router } from "../utils/trpc";
export const productsRouter = router({
    create: protectedProcedure
        .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        price: z.number(),
    }))
        .mutation(async ({ ctx, input }) => {
        const product = ctx.prisma.product.create({
            data: {
                title: input.title,
                description: input.description,
                price: input.price,
                userId: ctx.user.id,
            },
        });
        return product;
    }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const allProducts = await ctx.prisma.product.findMany({
            where: {
                userId: ctx.user.id,
            },
            orderBy: {
                createdAt: "desc", // Yangilari birinchi tursin
            },
        });
        return allProducts;
    }),
});
