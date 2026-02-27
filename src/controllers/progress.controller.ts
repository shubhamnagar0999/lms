import { Request, Response, NextFunction } from "express";
import { getCourseProgress, getVideoProgress, updateVideoProgress } from "../services/progress.service";
import { sendResponse } from "../utils/response";

interface AuthRequest extends Request {
  user?: any;
}

export const updateProgressHandler = async (req: AuthRequest,res: Response,next: NextFunction) => {
  try {
    const userId = req.user.userId;

    const progress = await updateVideoProgress(userId, req.body);

    sendResponse(res, 200, "Progress updated successfully", progress);
  } catch (error) {
    next(error);
  }
};

export const getProgressHandler = async (req: AuthRequest,res: Response,next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const lessonId = Number(req.params.lessonId);

    const progress = await getVideoProgress(userId, lessonId);

    sendResponse(res, 200, "Progress fetched successfully", progress);
  } catch (error) {
    next(error);
  }
};

export const getCourseProgressHandler = async (req: AuthRequest,res: Response,next: NextFunction) => {
  try {
    const userId = req.user.userId;
    const courseId = Number(req.params.courseId);

    const progress = await getCourseProgress(userId, courseId);

    sendResponse(res, 200, "Course Progress fetched successfully", progress);
  } catch (error) {
    next(error);
  }
};