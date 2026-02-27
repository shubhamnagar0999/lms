import prisma from "../config/prisma";
import { CreateEnrollmentDto } from "../dtos/enrollment.dto";
import { AppError } from "../utils/AppError";

export const bulkEnrollStudent = async (data: CreateEnrollmentDto) => {
  const { userId, courseIds } = data;

  if (!Array.isArray(courseIds) || courseIds.length === 0) {
    throw new AppError("courseIds must be a non-empty array", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });

  if (!user || user.role.name !== "STUDENT") {
    throw new AppError("Invalid student ID", 400);
  }

  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
    select: { id: true },
  });

  const existingCourseIds = new Set(courses.map((c) => c.id));
  const missingCourseIds = courseIds.filter((id) => !existingCourseIds.has(id));

  if (missingCourseIds.length > 0) {
    throw new AppError(`Courses not found: ${missingCourseIds.join(", ")}`, 404);
  }

  const result = await prisma.enrollment.createMany({
    data: courseIds.map((courseId) => ({ userId, courseId })),
    skipDuplicates: true,
  });

  return {
    enrolledCount: result.count,
    userId,
    courseIds,
  };
};