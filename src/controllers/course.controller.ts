import { Request, Response, NextFunction } from "express";
import { createCourse, deleteCourse, getAllCourses, updateCourse } from "../services/course.service";
import { sendResponse } from "../utils/response";

export const getAllCoursesHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const courses = await getAllCourses();
    sendResponse(res, 200, "Courses fetched successfully", courses);
  } catch (error) {
    next(error);
  }
};


export const createCourseHandler = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const course = await createCourse(req.body);
    sendResponse(res, 201, "Course created successfully", course);
  } catch (error) {
    next(error);
  }
};

export const updateCourseHandler = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const course = await updateCourse(id, req.body);
    sendResponse(res, 200, "Course updated successfully", course);
  } catch (error) {
    next(error);
  }
};


export const deleteCourseHandler = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await deleteCourse(id);
    sendResponse(res, 200, "Course deleted successfully");
  } catch (error) {
    next(error);
  }
};