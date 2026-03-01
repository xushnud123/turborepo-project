import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@my-app/shared";

export const trpc = createTRPCReact<AppRouter>();
