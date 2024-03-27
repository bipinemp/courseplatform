import { z } from "zod";

export const CourseSchema = z.object({
  // Course
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" })
    .min(10, { message: "Minimum of 10 Characters is required" })
    .max(20, { message: "Maximum of 20 characters is allowed" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" })
    .min(20, { message: "Minimum of 20 Characters is required" })
    .max(100, { message: "Maximum of 100 characters is allowed" }),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, { message: "You must enter a Price amount" }),
  questionsCount: z
    .string({ required_error: "Questions Count is required" })
    .min(1, { message: "You must enter a questions count" })
    .optional(),

  // Question
  questions: z.array(
    z.object({
      title: z
        .string({ required_error: "Question Name is required" })
        .min(1, { message: "Question Name is required" })
        .min(10, { message: "Minimum of 10 Characters is required" })
        .max(100, { message: "Maximum of 100 characters is allowed" }),
      correctAnswer: z
        .string({ required_error: "Correct Answer is required" })
        .min(1, { message: "Correct Answer is required" })
        .max(100, { message: "Maximum of 100 characters is allowed" }),
      answers: z.array(
        z.object({
          title: z
            .string({ required_error: "Answer is required" })
            .min(1, { message: "Answer is required" })
            .max(100, { message: "Maximum of 100 characters is allowed" }),
        }),
      ),
    }),
  ),
});

export type TCourse = z.infer<typeof CourseSchema>;
