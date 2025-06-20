import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError{
    statusCode=400;
    constructor(public errors:ValidationError[]){
        super("Invalid Request");

        Object.setPrototypeOf(this,RequestValidationError.prototype);
        

    }
    serializeError(): [{ message: string; field?: string }] {
        return this.errors.map(err => {
            return {
                message: err.msg as string,
                
            };
        }) as [{ message: string; field?: string }];
    }
}

// throw new RequestValidationError(errors)