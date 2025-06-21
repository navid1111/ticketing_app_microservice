import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "@nksticketss/common";
import { requireAuth } from "@nksticketss/common";;

const router = express.Router();
router.get("/api/users/currentuser",currentUser,requireAuth, (req, res) => {
  res.send({currentUser:req.currentUser || null})
  
});

export { router as currentuserRouter };
