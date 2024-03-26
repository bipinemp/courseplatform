import { TCourse } from "@/schemas/courseType";
import axios from "axios";

export const registerUser = async (data: TRegister) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Course
export const createCourse = async (data: TCourse) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCourse = async (data: any) => {
  try {
    const { id, ...dataWithoutId } = data;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/edit/${id}`,
      dataWithoutId,
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllCourses = async (query: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/?query=${query}`,
    );

    return response.data.courses;
  } catch (error) {
    return error;
  }
};

export const getAllAdminCourses = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`,
    );

    return response.data.courses;
  } catch (error) {
    return error;
  }
};

export const getCourseDetails = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`,
    );
    return response.data.course;
  } catch (error) {
    return error;
  }
};

interface ProgressInput {
  questionId: string;
  courseId: string;
}
export const setProgress = async (data: ProgressInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/progress`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
    );
    return response.data.userDetails;
  } catch (error) {
    return error;
  }
};

interface CourseEnrollmentProps {
  name: string;
  price: number;
  id: string;
}

export const setCourseEnrollment = async (data: CourseEnrollmentProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/create`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// For admin analytics
export const getAdminAnalytics = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTransactionsDetails = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    );
    return response.data.transactions;
  } catch (error) {
    return error;
  }
};
