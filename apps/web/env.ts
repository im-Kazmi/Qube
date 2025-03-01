import { keys as auth } from "@repo/auth/keys";
import { keys as database } from "@repo/database/keys";
import { keys as core } from "@repo/next-config/keys";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [auth(), core(), database()],
  server: {},
  client: {},
  runtimeEnv: {
    NODE_ENV: z.string(),
  },
});
