import { router } from "../utils/trpc";
import { authRouter } from "./auth";
import { productsRouter } from "./products";
import { usersRouter } from "./users";
export const appRouter = router({
    users: usersRouter,
    auth: authRouter,
    products: productsRouter,
});
