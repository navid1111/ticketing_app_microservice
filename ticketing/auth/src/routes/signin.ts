import express from 'express'

const router = express.Router()
router.get('/api/users/signIn',(req,res)=>{
    res.send("HELLO THERE")

})

export {router as signInRouter}