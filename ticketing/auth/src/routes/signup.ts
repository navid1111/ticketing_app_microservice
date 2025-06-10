import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../model/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post(
  "/api/users/signUp",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Password must be provided and must be between 4 to 20 characters"
      ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with this email");
      throw new BadRequestError("User already exists with this email");
    }
    const user = User.build({ email, password });
    await user.save();
    

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session 
    req.session={
      jwt:userJwt
    }

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
