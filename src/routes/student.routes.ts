import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getStudentCoursesHandler } from "../controllers/student.controller";

const router = Router();

router.get(
  "/courses",
  authMiddleware,
  getStudentCoursesHandler
);

export default router;