import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Routes from "./routes/index.js";

// load env variables
dotenv.config();
// create express server
const app = express();
const PORT = process.env.PORT || 4040;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware

// routes
app.use(Routes);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`server connected to ${PORT}`);
    });
  })
  .catch((error) => console.log("CONNECTION FAILED", error));
