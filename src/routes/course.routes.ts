import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnlyMiddleware } from "../middleware/role.middleware";
import { createCourseHandler, deleteCourseHandler, getAllCoursesHandler, updateCourseHandler } from "../controllers/course.controller";

const router = Router();

router.post("", authMiddleware, adminOnlyMiddleware, createCourseHandler);
router.put("/:id", authMiddleware, adminOnlyMiddleware, updateCourseHandler);
router.delete("/:id", authMiddleware, adminOnlyMiddleware, deleteCourseHandler);
router.get("/", authMiddleware, adminOnlyMiddleware, getAllCoursesHandler);


export default router;