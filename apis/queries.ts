import { useQuery } from "@tanstack/react-query";
import { getCourseDetails, getUserDetails } from "./apis";

export const useGetCourseDetails = (id: string) => {
  const { data, isPending } = useQuery<CourseDetails>({
    queryKey: ["cousedetails", id],
    queryFn: (obj) => {
      const courseDetails = getCourseDetails(obj.queryKey[1] as string);
      return courseDetails;
    },
  });

  return { data, isPending };
};

export const useGetUserDetails = () => {
  const { data, isPending } = useQuery<UserDetail>({
    queryKey: ["userDetail"],
    queryFn: getUserDetails,
  });

  return { data, isPending };
};
