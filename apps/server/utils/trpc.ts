import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Token topilmadi" });
  }

  try {
    const decoded = jwt.verify(ctx.token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await ctx.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Foydalanuvchi topilmadi",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Token yaroqsiz" });
  }
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
