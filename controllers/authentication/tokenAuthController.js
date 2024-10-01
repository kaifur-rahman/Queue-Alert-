import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { deleteRefreshToken } from "../../utilities/dbHelpers.js";
import { createAccessToken } from "../../utilities/createToken.js";
import { clearCookiesSignout } from "../../utilities/clearCookiesSignout.js";

dotenv.config();

//to verify access token
export const verifyAuthToken = (req, res) => {
  console.log("Req received to verify access token");
  const { accessToken } = req.cookies;
  if (!accessToken) {
    //no acccess token in cookies
    console.log("No access token found in cookies");
    res.status(401).json({ message: "Unauthorized access." });
    return;
  }
  jwt.verify(accessToken, process.env.jwtAccessSecret, (err, decoded) => {
    if (err) {
      //access token expired or invalid
      console.log("Access token expired or invalid");
      res.status(403).json({ message: "Token expired or invalid" });
      return;
    } else {
      //access token valid
      console.log("Access token valid access granted");
      res.status(200).json({ message: "Access granted." });
      return;
    }
  });
};

//to refresh access token
export const refreshAccessToken = (req, res) => {
  console.log("Request to refresh access token.");
  const { refreshToken, userDetails } = req.cookies;
  if (!refreshToken) {
    console.log("No refresh token found.");
    //clear cookies due to which invalid req generated
    clearCookiesSignout(res);
    res.status(401).json({ message: "Unauthroized access" });
  }
  jwt.verify(
    refreshToken,
    process.env.jwtRefreshSecret,
    async (err, decoded) => {
      if (err) {
        console.log("Refresh token expired or invalid");
        //clear cookies
        clearCookiesSignout(res);
        //delete refresh token saved in db
        if (userDetails) {
          await deleteRefreshToken(userDetails);
          console.log("Refresh token deleted from user's db.");
        }
        res.status(403).json({ message: "token expired re-login" });
        return;
      } else {
        console.log("Refresh token is still valid");
        const newAccessToken = createAccessToken();
        //setting tokens as cookie
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
