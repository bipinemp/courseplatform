"use client";

import { getAdminAnalytics } from "@/apis/apis";
import Container from "@/components/Container";
import GlobalLoading from "@/components/GlobalLoading";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Page = () => {
  const { theme } = useTheme();
  const { data, isPending, isFetched } = useQuery<TAnalytics>({
    queryKey: ["analytics"],
    queryFn: getAdminAnalytics,
  });

  if (isPending) {
    return <GlobalLoading />;
  }

  if (
    isFetched &&
    data?.barData?.length === 0 &&
    data?.piechartData?.length === 0
  ) {
    return (
      <h1 className="mt-32 pl-4 text-center font-semibold text-red-500 md:ml-60">
        You haven't purchased a course.
      </h1>
    );
  }

  return (
    <Container>
      <div className="mb-20 mt-32 flex flex-col gap-14 md:ml-52">
        <div className="flex items-center gap-7">
          <div className="flex min-h-[85px] w-[270px] flex-col rounded-md border border-input py-3 pl-6 shadow">
            <p className="text-[1.1rem] font-semibold">Total Revenue</p>
            <h1 className="font-bold opacity-75">NPR {data?.totalRevenue}</h1>
          </div>
          <div className="flex min-h-[85px] w-[270px] flex-col rounded-md border border-input py-3 pl-6 shadow">
            <p className="text-[1.1rem] font-semibold">Total Sales</p>
            <h1 className="font-bold opacity-75">{data?.sales}</h1>
          </div>
        </div>

        {data && data.barData && data.barData.length > 0 && (
          <div>
            <ResponsiveContainer width={"100%"} height={350}>
              <BarChart data={data.barData}>
                <XAxis
                  dataKey={"course"}
                  stroke="#888888"
                  fontSize={10}
                  fontWeight={700}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: theme == "light" ? "#f5f5f5" : "#171717" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background py-2 pl-4 pr-7 shadow-sm">
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col">
                              <p className="opacity-80">
                                {payload[0].payload.course}
                              </p>
                              <p className="font-bold">
                                Rs. {payload[0].payload.amount}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={14}
                  fontWeight={700}
                  width={70}
                  tickFormatter={(value) => `NPR ${value}`}
                />
                <Bar
                  dataKey={"amount"}
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {data && data.piechartData && data.piechartData.length > 0 && (
          <div className="mt-10 flex flex-col gap-14">
            <h1 className="pl-16 font-bold underline underline-offset-4 opacity-75">
              Course Popularity Metrics
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={data.piechartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" dy={10} />
                <YAxis dataKey="count" allowDecimals={false} />
                <Legend />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background py-2 pl-4 pr-7 shadow-sm">
                          <div className="flex w-full flex-col gap-2">
                            <div className="flex w-full flex-col">
                              <p className="opacity-80">
                                {payload[0].payload.name}
                              </p>
                              <p className="font-bold">
                                {payload[0].payload.count}
                                {payload[0].payload.count > 1
                                  ? " Users"
                                  : " User"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#23C45E"
                  activeDot={{ r: 8 }}
                  strokeWidth={5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
