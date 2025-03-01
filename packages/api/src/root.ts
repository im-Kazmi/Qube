import { postRouter } from "./routers/post";
import { appsRouter } from "./routers/apps";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  apps: appsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
