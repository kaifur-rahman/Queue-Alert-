import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  googleAuthSuccess,
} from "../controllers/authentication/googleAuthController.js";

import {
  verifyAuthToken,
  refreshAccessToken,
} from "../controllers/authentication/tokenAuthController.js";

const router = express.Router();

//to initiate google oauth login
router.get("/auth/google", googleAuth);

//to handle the callback from google sign in
router.get("/oauth/callback", googleAuthCallback, googleAuthSuccess);

//to verify access token
router.get("/auth/verify/access", verifyAuthToken);

//to refresh access token
router.get("/auth/refresh", refreshAccessToken);

export default router;
