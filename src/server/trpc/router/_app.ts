import { router } from "../trpc";
import { atRouter } from "./at";

export const appRouter = router({
  at: atRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
