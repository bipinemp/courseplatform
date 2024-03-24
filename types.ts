type TRegister = {
  name: string;
  email: string;
  password: string;
};

type CompletedCourse = {
  courseId: string;
  id: string;
  userId: string;
  percentage: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  questionsCount: number;
};

type CourseDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  question: Question[];
  progress: Progress[];
};

type Question = {
  id: string;
  title: string;
  correctAnswer: number;
  answers: Answer[];
  progress: Progress[];
};

type Answer = {
  id: string;
  title: string;
  questionId: string;
};

type Progress = {
  userId?: string;
  courseId?: string;
  questionId?: string;
};

type Enrollment = {
  course: Course;
};

enum UserRole {
  ADMIN,
  USER,
}
type UserDetail = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  role: UserRole;
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
  completedCourses: CompletedCourse[];
  enrollment: Enrollment[];
};
