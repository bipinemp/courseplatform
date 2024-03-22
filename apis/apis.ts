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
