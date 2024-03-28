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
  CourseProgress: CourseProgress[];
};

type EditCourseDetails = {
  id: string;
  title: string;
  description: string;
  price: string;
  questionsCount: string;
  questions: Question[];
  progress: Progress[];
};

type CourseProgress = {
  id: string;
  userId: string;
  courseId: string;
  completedQuestions: string[];
  totalQuestions: number;
  progress: number;
};

type CourseDetails = {
  id: string;
  title: string;
  description: string;
  price: number;
  questionsCount: string;
  question: Question[];
  CourseProgress: CourseProgress[];
};

type Question = {
  id: string;
  title: string;
  correctAnswer: string;
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
  CourseProgress: CourseProgress[];
  enrollment: Enrollment[];
};

type TAnalytics = {
  sales: number;
  totalRevenue: number;
  barData: {
    amount: string;
    course: string;
  }[];
  piechartData: {
    name: string;
    count: number;
  }[];
};

type Transaction = {
  amount: string;
  status: string;
  user: {
    email: string;
  };
};
