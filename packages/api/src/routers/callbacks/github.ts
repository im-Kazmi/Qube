import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const githubRouter = {
  handleCallback: publicProcedure
    .input(
      z.object({
        code: z.string(),
        userId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { code, userId, name } = input;

      try {
        const response = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: process.env.GITHUB_CLIENT_ID,
              client_secret: process.env.GITHUB_CLIENT_SECRET,
              code,
            }),
          },
        );

        const data = await response.json();
        const { access_token: accessToken } = data;

        if (!accessToken) {
          throw new Error("Failed to retrieve access token from GitHub.");
        }

        const connection = await ctx.db.connection.create({
          data: {
            userId,
            name,
            config: {
              accessToken,
            },
          },
        });

        return {
          success: true,
          connection,
        };
      } catch (error) {
        console.error("Error handling GitHub OAuth callback:", error);
        throw new Error("Failed to handle GitHub OAuth callback.");
      }
    }),
};
