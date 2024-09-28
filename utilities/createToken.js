import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createAccessToken = () => {
  const token = jsonwebtoken.sign({ data: {} }, process.env.jwtAccessSecret, {
    expiresIn: "15m",
  });
  return token;
};

export const createRefreshToken = () => {
  const token = jsonwebtoken.sign({ data: {} }, process.env.jwtRefreshSecret, {
    expiresIn: "1h",
  });
  return token;
};
