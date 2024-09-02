import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketmanager.js";
import * as dotenv from "dotenv";
dotenv.config();
const A = process.env.Mongo;

const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routes
import userRoutes from "./routes/users.routes.js";
app.use("/users", userRoutes);

const run = async () => {
  const connectionDb = await mongoose.connect(A);
  // console.log(`HOST : ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENING ON PORT");
  });
};
app.get("/", (req, res) => {
  res.send("welcome to the backend");
});

run();
