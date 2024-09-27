import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import "./config/googleSignin.js";
import { connectDb } from "./config/database.js";

dotenv.config();
const MODE = process.env.mode || "Development";
const PORT = process.env.port || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
//auth
app.use(passport.initialize());

//db connection
connectDb();

//to initiate google oauth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//to handle the callback from google sign in
app.get(
  "/oauth/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    // Successful authentication, redirect to the desired route
    res.redirect("http://localhost:5000/success");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running in ${MODE} mode on port ${PORT}`);
});
