import express from "express";
import { json } from "body-parser";

import "express-async-errors";
import { errorHandler } from "@nksticketss/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(createTicketRouter)

app.get("/", (req, res) => {
  res.send("hello");
});

// Register all routes first




// Error handler must be registered LAST
app.use(errorHandler);


export {app};