import { Response, NextFunction } from "express";
import { Request } from "express";
import { AppError } from "../utils/AppError";

interface AuthRequest extends Request {
  user?: any;
}

export const adminOnlyMiddleware = (req: AuthRequest,res: Response,next: NextFunction) => {
  if (!req.user || req.user.role !== "ADMIN") {
    throw new AppError("Access denied.",403)
  }
  next();
};