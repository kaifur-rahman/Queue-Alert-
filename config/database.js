import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const user = process.env.dbUser;
const pass = process.env.dbPass;

const connectDb = () => {
  mongoose
    .connect(
      `mongodb+srv://${user}:${pass}@queue-management-system.syspp.mongodb.net/?retryWrites=true&w=majority&appName=queue-management-system`
    )
    .then(() => {
      console.log("Databse connected");
    })
    .catch((err) => {
      console.log(`Error in connecting to databse +${err}`);
    });
};

export { connectDb };
