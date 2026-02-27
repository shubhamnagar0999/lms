import { Request, Response, NextFunction } from "express";
import { getEnrolledCourses } from "../services/student.service";
import { sendResponse } from "../utils/response";

interface AuthRequest extends Request {
  user?: any;
}

export const getStudentCoursesHandler = async (req: AuthRequest,res: Response,next: NextFunction) => {
  try {
    const userId = req.user.userId;

    const courses = await getEnrolledCourses(userId);

    sendResponse(res, 200, "Enrolled courses fetched successfully", courses);
  } catch (error) {
    next(error);
  }
};