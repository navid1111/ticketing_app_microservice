import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { ExitStatus } from "typescript";

interface UserPlayload{
    id:string,
    email:string
}

declare global {
    namespace Express{
        interface Request{
            currentUser?:UserPlayload;
        }
    }
}
export const currentUser=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.session?.jwt){
        return next();

    }
    try {
        const payload=jwt.verify(req.session.jwt,process.env.JWT_KEY!) as UserPlayload
        req.currentUser=payload;
        
    } catch (error) {
        console.log(error)
        
    }
    next();
}