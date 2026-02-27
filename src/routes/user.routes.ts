import { Router } from "express";
import { createStudentHandler, getAllStudents } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnlyMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post("/students",authMiddleware,adminOnlyMiddleware, createStudentHandler);
router.get("/students",authMiddleware,adminOnlyMiddleware, getAllStudents);

export default router;