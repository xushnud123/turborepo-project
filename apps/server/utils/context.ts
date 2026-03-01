import "dotenv/config";

import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "@my-app/db";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const token = req.cookies?.token;
  return { req, res, prisma, token };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
