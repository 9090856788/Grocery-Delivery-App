import fastify from "fastify";
import dotenv from "dotenv";
import { PORT } from "./src/config/config.js";
import dbConnect from "./src/dbConnect/dbConnect.js";

const app = fastify();

const start = async () => {
  try {
    dbConnect();
    await app.listen({ port: PORT });
    console.log(`App running on the port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
