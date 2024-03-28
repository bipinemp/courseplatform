"use client";

import { getAdminAnalytics } from "@/apis/apis";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
  const { data, isPending } = useQuery<TAnalytics>({
    queryKey: ["analytics"],
    queryFn: getAdminAnalytics,
  });

  if (isPending) {
    return (
      <Container>
        <div className="ml-64 mt-36">
          <Loader2 className="size-28 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-20 ml-52 mt-32 flex flex-col gap-14">
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
        <div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data?.barData}>
              <XAxis
                dataKey={"course"}
                stroke="#888888"
                fontSize={10}
                fontWeight={700}
                tickLine={false}
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
        <div className="mt-10 flex flex-col gap-14">
          <h1 className="pl-16 font-bold underline underline-offset-4 opacity-75">
            Course Popularity Metrics
          </h1>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data?.piechartData}>
              <XAxis dataKey="name" />
              <YAxis dataKey="count" />
              <Legend />
              <Tooltip />
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
      </div>
    </Container>
  );
};

export default Page;
