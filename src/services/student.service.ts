import prisma from "../config/prisma";

export const getEnrolledCourses = async (userId: number) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          lessons: true,
        },
      },
    },
  });

  return enrollments.map((e) => e.course);
};