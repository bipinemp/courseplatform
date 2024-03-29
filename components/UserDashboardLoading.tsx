const UserDashboardLoading = () => {
  return (
    <div className="-mt-[1.7rem] flex flex-col gap-7">
      <div className="flex items-center gap-10">
        <div className="h-[85px] w-[270px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[85px] w-[270px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
        <div className="h-[250px] w-[320px] animate-pulse rounded-md bg-gray-300 dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};

export default UserDashboardLoading;
