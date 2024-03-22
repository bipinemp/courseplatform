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

export const getAllCourses = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
