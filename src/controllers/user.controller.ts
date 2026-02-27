import { Request, Response, NextFunction } from "express";
import { createStudent,getStudents } from "../services/user.service";
import { sendResponse } from "../utils/response";

export const createStudentHandler = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const student = await createStudent(req.body);
    sendResponse(res,201,"Student created successfully",student)

  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    console.log("page,limit",page,limit);
    const result = await getStudents(page, limit);

    sendResponse(res, 200, "Students List Fetched.", result);
  } catch (error) {
    next(error);
  }
};