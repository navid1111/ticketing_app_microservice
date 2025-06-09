import express from "express";
import { json } from "body-parser";
import { currentuserRouter } from "./routes/current-user";
import 'express-async-errors'
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
const app = express();
app.set('trust proxy',true)
app.use(json());
app.use(
  cookieSession({
    signed:false,
    secure:true
  })
)

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
