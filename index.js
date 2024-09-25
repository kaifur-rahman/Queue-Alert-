import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./config/database.js";

dotenv.config();
const MODE = process.env.mode || "Development";
const PORT = process.env.port || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running in ${MODE} mode on port ${PORT}`);
});
