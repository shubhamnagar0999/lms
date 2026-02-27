import prisma from "../config/prisma";
import { addLesson, deleteLesson, updateLesson } from "../services/lesson.service";
import { sendResponse } from "../utils/response";
import { Request, Response, NextFunction } from "express";

export const addLessonHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const lesson = await addLesson(req.body);
    sendResponse(res, 201, "Lesson added successfully", lesson);
  } catch (error) {
    next(error);
  }
};

export const updateLessonHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = Number(req.params.id);
    const lesson = await updateLesson(id, req.body);
    sendResponse(res, 200, "Lesson updated successfully", lesson);
  } catch (error) {
    next(error);
  }
};


export const deleteLessonHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = Number(req.params.id);
    await deleteLesson(id);
    sendResponse(res, 200, "Lesson deleted successfully");
  } catch (error) {
    next(error);
  }
};