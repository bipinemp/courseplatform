import { useQuery } from "@tanstack/react-query";
import { getCourseDetails, getUserDetails } from "./apis";

export const useGetCourseDetails = (id: string) => {
  return useQuery<CourseDetails>({
    queryKey: ["cousedetails", id],
    queryFn: (obj) => {
      const courseDetails = getCourseDetails(obj.queryKey[1] as string);
      return courseDetails;
    },
  });
};

export const useGetUserDetails = (isDashboard: boolean) => {
  return useQuery<UserDetail>({
    queryKey: ["userDetail"],
    queryFn: getUserDetails,
    enabled: isDashboard,
  });
};
