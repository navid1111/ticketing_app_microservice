import express from 'express'

const router = express.Router()
router.get('/api/users/signUp',(req,res)=>{
    res.send("HELLO THERE")

})

export {router as signUpRouter}