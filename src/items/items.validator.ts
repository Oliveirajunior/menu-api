import {body, validationResult} from 'express-validator'
import { Request, Response, NextFunction } from "express";

export const itemSchema = [
  body('name')
    .isString().withMessage('NAME must be text')
    .not().isNumeric().withMessage('NAME must not be number')
    .isLength({min:4, max: 20}).withMessage('NAME must be between 4 and 20 characters'),
  body('price')
    .isInt().withMessage('PRICE must be integer')
    .not().isString().withMessage('PRICE must not be text'),
  body('description')
    .isString().withMessage('DESCRIPTION must be text')
    .not().isNumeric().withMessage('DESCRIPTION must not be number')
    .isLength({min:5, max: 200}).withMessage('DESCRIPTION must be between 5 and 200 characters'),
  body('image')
    .isURL().withMessage('IMAGE mut be a URL to invoke a image')
];

export const itemCheck = (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array();
      return res.status(400).send(message);
    }
    next();  
};