import { customError } from "./custom-error";

export class DatabaseConnectionError extends customError {
  reason = "Error connecting to the database";
  statusCode=500
  constructor() {
    super("Invalid Request");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
        // field is optional and can be omitted or set to undefined
      }
    ] as [{ message: string; field?: string | undefined }];
  }
}
