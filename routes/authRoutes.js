import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  googleAuthSuccess,
} from "../controllers/googleAuthController.js";

const router = express.Router();

//to initiate google oauth login
router.get("/auth/google", googleAuth);

//to handle the callback from google sign in
router.get("/oauth/callback", googleAuthCallback, googleAuthSuccess);

export default router;
