import Container from "./Container";
import { Loader2 } from "lucide-react";

const CourseDetailLoading = () => {
  return (
    <Container>
      <div className="ml-52 mt-32 flex w-[850px] flex-col gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="h-[55px] w-[200px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
          <div className="h-[40px] w-[200px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="mb-2 h-[45px] w-[75%] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>

          <div className="grid grid-cols-2 gap-2">
            <div className="h-[60px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
            <div className="h-[60px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
            <div className="h-[60px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
            <div className="h-[60px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="h-[40px] w-[130px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
            <div className="h-[40px] w-[130px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CourseDetailLoading;
// animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800
