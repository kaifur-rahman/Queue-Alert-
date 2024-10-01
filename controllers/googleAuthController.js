import passport from "passport";
import {
  createAccessToken,
  createRefreshToken,
} from "../utilities/createToken.js";
import {
  saveNewUserLogin,
  updateExistingUserLogin,
} from "../utilities/dbHelpers.js";
import userModel from "../models/userModel.js";

//controllers

//initiate google auth
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

//callback from googleauth
export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: false,
});

//callback success
export const googleAuthSuccess = async (req, res) => {
  const loggedInUser = req.user._json;
  const accessToken = createAccessToken();
  const refreshToken = createRefreshToken();
  try {
    const user = await userModel.findById(loggedInUser.sub);
    if (!user) {
      await saveNewUserLogin(loggedInUser, refreshToken);
      console.log("New user logged first time details saved to db.");
    } else {
      await updateExistingUserLogin(loggedInUser, refreshToken);
      console.log("Existing user logged again details updated to db.");
    }
    //setting tokens as cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    res.redirect("http://localhost:5173/dashboard");
  } catch (err) {
    console.log(`error during google authentication callback ${err}`);
    res.redirect("http://localhost:5173/auth/err");
  }
};
