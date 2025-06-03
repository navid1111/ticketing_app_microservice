import express from "express";
import {json} from 'body-parser'
import { currentuserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { signOutRouter } from "./routes/signout";


const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);



app.listen(3000,()=>{
    console.log("listening to port 3000  !!!")
})