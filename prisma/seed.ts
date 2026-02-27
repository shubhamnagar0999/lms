import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: "STUDENT" },
    update: {},
    create: { name: "STUDENT" },
  });

  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@test.com",
      password: adminPassword,
      roleId: adminRole.id,
    },
  });

  const studentPassword = await bcrypt.hash("student123", 10);

  const student = await prisma.user.upsert({
    where: { email: "student@test.com" },
    update: {},
    create: {
      name: "Student User",
      email: "student@test.com",
      password: studentPassword,
      roleId: studentRole.id,
    },
  });

  const course = await prisma.course.create({
    data: {
      name: "Node.js Basics",
      description: "Learn fundamentals of Node.js",
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Introduction to Node",
      description: "Overview of Node.js",
      videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
      duration: 600,
      courseId: course.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Advanced Concepts",
      description: "Advanced topics",
      videoUrl: "https://media.w3.org/2010/05/video/movie_300.mp4",
      duration: 600,
      courseId: course.id,
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course.id,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

  