import { AppError } from "../utils/AppError";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/user.dto";

export const createStudent = async (data: CreateUserDto) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("User already exists with this email",400);
  }

  const studentRole = await prisma.role.findUnique({
    where: { name: "STUDENT" },
  });

  if (!studentRole) {
    throw new AppError("Student role not found",400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const student = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: studentRole.id,
    },
  });

  return student;
};

export const getStudents = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
 
  const [students, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: {
          name: "STUDENT",
        },
      },
      skip:skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({
      where: {
        role: {
          name: "STUDENT",
        },
      },
    }),
  ]);

  return {
    students,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};