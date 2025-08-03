import express from "express";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


import authRoute from "./routes/auth.route.js";
import { connectDB } from "./libs/dbConnnect.js";

config({
  path: "./.env",
});
const app = express();
const Port = process.env.PORT 


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes

app.use("/api/auth", authRoute);

connectDB().then(() => {
  app.listen(Port, () => {
    console.log(`Example app listening on port ${Port}`);
  });
});
