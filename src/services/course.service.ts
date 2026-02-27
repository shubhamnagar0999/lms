import prisma from "../config/prisma";
import { CreateCourseDto, UpdateCourseDto } from "../dtos/course.dto";

export const getAllCourses = async () => {
  return await prisma.course.findMany({
    include: {
      lessons: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createCourse = async (data: CreateCourseDto) => {
  return await prisma.course.create({
    data,
  });
};

export const updateCourse = async (id: number,data: UpdateCourseDto) => {
  return await prisma.course.update({
    where: { id },
    data,
  });
};

export const deleteCourse = async (id: number) => {
  return await prisma.course.delete({
    where: { id },
  });
};