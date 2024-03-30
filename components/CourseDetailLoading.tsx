import Container from "./Container";

const CourseDetailLoading = () => {
  return (
    <Container>
      <div className="mt-32 flex w-full flex-col gap-5 md:pl-52 xl:w-[1100px] 2xl:-ml-20 2xl:w-full 2xl:pl-0">
        <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="h-[55px] w-[220px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
          <div className="h-[40px] w-[200px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="mb-2 h-[45px] w-[90%] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>

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
