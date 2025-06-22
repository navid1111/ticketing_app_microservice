import { currentUser, requireAuth } from '@nksticketss/common'
import express, { Request, Response } from 'express'
const router= express.Router()

router.post('/api/tickets',currentUser,(req:Request,res:Response,next)=>{
    console.log('Current user:', req.currentUser);
    console.log('Cookies:', req.session);
    next();
},requireAuth,(req:Request,res:Response)=>{
    res.sendStatus(200);
})

export {router as createTicketRouter}