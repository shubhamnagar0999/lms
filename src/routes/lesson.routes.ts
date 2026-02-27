import { Router } from "express";
import { addLessonHandler, deleteLessonHandler, updateLessonHandler } from "../controllers/lesson.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnlyMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post("/", authMiddleware, adminOnlyMiddleware, addLessonHandler);
router.put("/:id", authMiddleware, adminOnlyMiddleware, updateLessonHandler);
router.delete("/:id", authMiddleware, adminOnlyMiddleware, deleteLessonHandler);

export default router;