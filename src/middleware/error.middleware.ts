import { HttpException } from "../common/httpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  const status = error.statusCode || error.status || 500;

  return res.status(status).send(error);

};
