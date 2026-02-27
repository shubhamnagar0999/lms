import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getCourseProgressHandler, getProgressHandler, updateProgressHandler } from "../controllers/progress.controller";


const router = Router();

router.post("/",authMiddleware,updateProgressHandler);
router.get("/:lessonId",authMiddleware,getProgressHandler);
router.get("/courses/:courseId",authMiddleware,getCourseProgressHandler);

export default router;