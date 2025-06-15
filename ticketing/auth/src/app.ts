import express from "express";
import { json } from "body-parser";
import { currentuserRouter } from "./routes/current-user";
import "express-async-errors";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";

import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',  // Only secure in production, not in test
  })
);

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


export {app};