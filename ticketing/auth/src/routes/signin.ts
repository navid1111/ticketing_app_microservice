import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../model/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from "jsonwebtoken";
import e from 'express';

const router = express.Router()
router.post('/api/users/signIn',[
    body('email')
       .isEmail()
       .withMessage('Email is required'),
    body('password')
       .trim()
       .notEmpty()
       .withMessage("Must provide a password")
],
validateRequest,

async(req:Request,res:Response)=>{
    const {email,password}=req.body
    const existingUser=await User.findOne({email})
    if(!existingUser){
        throw new BadRequestError("Invalid credentials")

    }
    const passwordMatch=await Password.compare(existingUser.password,password);
    if(!passwordMatch){
        throw new BadRequestError("Invalid credentials")
    }
        const userJwt = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email
          },
          process.env.JWT_KEY!
        );
    
        // Store it on session 
        req.session={
          jwt:userJwt
        }
    res.status(201).send(existingUser);

})

export {router as signInRouter}