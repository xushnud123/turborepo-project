import "dotenv/config";
import { prisma } from "@my-app/db";
export const createContext = ({ req, res }) => {
    const token = req.cookies?.token;
    return { req, res, prisma, token };
};
