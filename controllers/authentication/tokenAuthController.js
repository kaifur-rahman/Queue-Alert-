import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../utilities/createToken.js";
import { signoutCleanup } from "../../utilities/clearAuthSession.js";

dotenv.config();

export const verifyAuthToken = (req, res) => {
  console.log("Req received to verify access token");
  const { accessToken } = req.cookies;
  if (!accessToken) {
    console.log("No access token found in cookies");
    res.status(401).json({ message: "Unauthorized access." });
    return;
  }
  jwt.verify(accessToken, process.env.jwtAccessSecret, (err, decoded) => {
    if (err) {
      console.log("Access token expired or invalid");
      res.status(403).json({ message: "Token expired or invalid" });
      return;
    } else {
      console.log("Access token valid access granted");
      res.status(200).json({ message: "Access granted." });
      return;
    }
  });
};

export const refreshAccessToken = (req, res) => {
  console.log("Request to refresh access token.");
  const { refreshToken, userDetails } = req.cookies;
  if (!refreshToken) {
    console.log("No refresh token found.");
    clearCookiesSignout(res);
    res.status(401).json({ message: "Unauthroized access" });
  }
  jwt.verify(
    refreshToken,
    process.env.jwtRefreshSecret,
    async (err, decoded) => {
      if (err) {
        console.log("Refresh token expired or invalid");
        signoutCleanup(res, userDetails);
        res.status(403).json({ message: "token expired re-login" });
        return;
      } else {
        console.log("Refresh token is still valid");
        const newAccessToken = createAccessToken();
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        console.log("Created new access token & updated in cookie.");
        res.status(200).json({ message: "new token updated" });
        return;
      }
    }
  );
};

export const logout = async (req, res) => {
  console.log("Request to logout user");
  const { userDetails } = req.cookies;
  signoutCleanup(res, userDetails);
  res.status(200).json({ message: "Logged out successfully." });
};
