import { AppError } from "../utils/AppError";
import prisma from "../config/prisma";
import { UpdateProgressDto } from "src/dtos/progress.dto";

export const updateVideoProgress = async (userId: number,data: UpdateProgressDto) => {
  const { lessonId, watchedTime } = data;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: lesson.courseId,
      },
    },
  });

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 403);
  }

  const percentage = Math.min((watchedTime / lesson.duration) * 100,100);

  const completed = percentage >= 90;

  return await prisma.videoProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      watchedTime,
      percentage,
      completed,
    },
    create: {
      userId,
      lessonId,
      watchedTime,
      percentage,
      completed,
    },
  });
};

export const getVideoProgress = async (userId: number,lessonId: number) => {
  return await prisma.videoProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });
};

export const getCourseProgress = async (userId: number,courseId: number) => {
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    include: {
      videoProgress: {
        where: { userId },
      },
    },
  });

  const totalLessons = lessons.length;
  console.log("Videos",lessons)
  
  // console.log("Videos",lessons.videoProgress)

//   lessons.forEach((lesson) => {
//     console.log("Lesson ID:", lesson.id);
//     console.log("Video Progress:", lesson.videoProgress);
//   });

  const completedLessons = lessons.filter(
    (lesson) =>
      lesson.videoProgress.length > 0 &&
      lesson.videoProgress[0].completed
  ).length;

  const overallPercentage =totalLessons === 0? 0 : Math.round((completedLessons / totalLessons) * 100);

  return {
    totalLessons,
    completedLessons,
    overallPercentage,
  };
};