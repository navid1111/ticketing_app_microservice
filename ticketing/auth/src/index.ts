import express from "express";
import { json } from "body-parser";
import { currentuserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.send("hello");
});

// Register all routes first
app.use(currentuserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

// Error handler must be registered LAST
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
  
  app.listen(3000, () => {
    console.log("listening to port 3000  !!!");
  });
};
start();
