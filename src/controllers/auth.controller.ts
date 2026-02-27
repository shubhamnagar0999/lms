import { Request, Response, NextFunction } from "express";
import { login } from "../services/auth.service";
import { sendResponse } from "../utils/response";

export const loginHandler = async (req: Request,res: Response,next: NextFunction) => {
  try {
    console.log(req.body);
    
    const { email, password } = req.body;

    const result = await login(email, password);
    sendResponse(res,200,"Login successful",result);

  } catch (error) {
    next(error);
  }
};