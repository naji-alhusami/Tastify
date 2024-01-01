import express from "express";
import { getPayloadClient } from "./GetPayloadClient";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { type inferAsyncReturnType } from "@trpc/server";

const app = express(); // An Express server is created using the express package
const PORT = Number(process.env.PORT) || 3000; // The server listens on a specified port (PORT), which is either taken from the environment variable process.env.PORT or defaults to 3000

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>; // we will use it in trpc.ts to tell TS what type of context we are delling with

const start = async () => {
  const payload = await getPayloadClient({
    // it is the configuration for managing the DB.
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext, // it allows us to take req,res from express and forward them to API end point lives in NEXTjs
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL:${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
