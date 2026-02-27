import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import lessonRoutes from "./routes/lesson.routes";
import { errorHandler } from "./utils/error";
import enrollmentRoutes from "./routes/enrollment.routes";
import studentRoutes from "./routes/student.routes";
import progressRoutes from "./routes/progress.routes";


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/admin", userRoutes);

app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/courses", courseRoutes);
app.use("/api/admin/lessons", lessonRoutes);
app.use("/api/admin/enrollments", enrollmentRoutes);

app.use("/api/student", studentRoutes);
app.use("/api/student/progress", progressRoutes);






app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "LMS",
    time: new Date().toISOString()
  });
});
app.use(errorHandler);
export default app;
