
export interface CreateCourseDto {
  name: string;
  description?: string;
}

export interface UpdateCourseDto {
  name?: string;
  description?: string;
}