import { Request, Response, NextFunction, response } from "express";

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
  ) => {
    
    const message = "Resource not found";

    return res.status(404).send(message);
    
};