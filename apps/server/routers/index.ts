import { publicProcedure, router } from "../utils/trpc";
import { authRouter } from "./auth";
import { productsRouter } from "./products";
import { usersRouter } from "./users";
export const appRouter = router({
  greeting: publicProcedure.query(() => {
    console.log("hello 👋");
    return "hello tRPC v10!";
  }),
  users: usersRouter,
  auth: authRouter,
  products: productsRouter,
});

export type AppRouter = typeof appRouter;
