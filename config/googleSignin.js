import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStraregy } from "passport-google-oauth20";

dotenv.config();

//configure google oauth 2.0 strategy
passport.use(
  new GoogleStraregy(
    {
      clientID: process.env.oAuthClientId,
      clientSecret: process.env.oAuthClientSec,
      callbackURL: "/oauth/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
