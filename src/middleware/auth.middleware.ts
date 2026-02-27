import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest,res: Response,next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("No token provided",401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token",401);
  }
};