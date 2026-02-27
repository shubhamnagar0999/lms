import { Request, Response, NextFunction } from "express";
import { bulkEnrollStudent } from "../services/enrollment.service";
import { sendResponse } from "../utils/response";



export const bulkEnrollStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bulkEnrollStudent(req.body);
    sendResponse(res, 201, "Student enrolled into courses successfully", result);
  } catch (error) {
    next(error);
  }
};