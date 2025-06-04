import { customError } from "./custom-error";

export class BadRequestError extends customError{
    statusCode =400;
    constructor(public message:string){
        super(message);
        
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeError() {
    return [
      {
        message: this.message,
        // field is optional and can be omitted or set to undefined
      }
    ] as [{ message: string; field?: string | undefined }];
  }
}