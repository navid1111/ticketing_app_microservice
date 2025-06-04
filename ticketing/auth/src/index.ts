import express from "express";
import {json} from 'body-parser'
import { currentuserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.get('/',(req ,res)=>{
    res.send("hello")
})

// Register all routes first
app.use(currentuserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

// Error handler must be registered LAST
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("listening to port 3000  !!!")
})