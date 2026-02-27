export interface CreateLessonDto {
  title: string;
  description?: string;
  videoUrl: string;
  duration: number;
  courseId: number;
}

export interface UpdateLessonDto {
  title?: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
}