import { Router } from "express";
import { bulkEnrollStudentHandler } from "../controllers/enrollment.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnlyMiddleware } from "../middleware/role.middleware";

const router = Router();

router.post("/",authMiddleware,adminOnlyMiddleware,bulkEnrollStudentHandler);

export default router;