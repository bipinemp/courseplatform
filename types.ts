type TRegister = {
  name: string;
  email: string;
  password: string;
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
