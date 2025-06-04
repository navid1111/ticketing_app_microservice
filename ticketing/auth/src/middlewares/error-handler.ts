import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof RequestValidationError) {
    res.status(err.statusCode).send({ errors: err.serializeError() });
    return;
  }

  if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({ errors: err.serializeError() });
    return;
  }

  res.status(400).send({
    errors: [
      {
        message: err.message
      }
    ]
  });
};
