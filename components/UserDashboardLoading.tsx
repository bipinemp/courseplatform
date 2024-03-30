const UserDashboardLoading = () => {
  return (
    <div className="-mt-[1.7rem] flex w-full flex-col gap-7">
      <div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start">
        <div className="h-[85px] w-full animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800 md:w-[220px] lg:w-[270px]"></div>
        <div className="h-[85px] w-full animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800 md:w-[220px] lg:w-[270px]"></div>
      </div>
      <div className="ssm:grid-cols-2 grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};

export default UserDashboardLoading;
