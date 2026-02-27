import prisma from "../config/prisma";
import { CreateLessonDto, UpdateLessonDto } from "../dtos/lesson.dto";

export const addLesson = async (data:CreateLessonDto) => {
  return await prisma.lesson.create({
    data,
  });
};

export const updateLesson = async (
  id: number,
  data: UpdateLessonDto
) => {
  return await prisma.lesson.update({
    where: { id },
    data,
  });
};

export const deleteLesson = async (id: number) => {
  return await prisma.lesson.delete({
    where: { id },
  });
};