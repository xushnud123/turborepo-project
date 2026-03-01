import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../utils/trpc";
import { RegisterSchema, LoginSchema } from "@my-app/zod";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV! === "production",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  sameSite: "strict",
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export const authRouter = router({
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const userExists = await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (userExists) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        } else {
          const createUser = await ctx.prisma.user.create({
            data: {
              email: input.email,
              name: input.name,
              password: hashedPassword,
            },
          });
          const token = generateToken(createUser.id);
          ctx.res.cookie("token", token, cookieOptions);
          return createUser;
        }
      } catch (error) {
        console.log("REGISTER", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email yoki parol noto'g'ri",
      });
    }

    const isMatch = await bcrypt.compare(input.password, user.password);

    if (!isMatch) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email yoki parol noto'g'ri",
      });
    }

    const token = generateToken(user.id);
    ctx.res.cookie("token", token, cookieOptions);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }),
});
