"use client";

import { getTransactionsDetails } from "@/apis/apis";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { DataTable } from "../courses/_components/DataTable";
import { columns } from "./_components/columns";
import GlobalLoading from "@/components/GlobalLoading";

const Page = () => {
  const { data, isPending } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactionsDetails,
  });

  const transactions = data?.map((transaction) => ({
    amount: transaction.amount,
    status: transaction.status,
    email: transaction.user.email,
  }));

  if (isPending) {
    return <GlobalLoading />;
  }

  return (
    <Container>
      <div className="ml-52 mt-32 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <h1 className="font-bold underline underline-offset-4 opacity-85">
            Transactions
          </h1>
        </div>
        <DataTable data={transactions || []} columns={columns} />
      </div>
    </Container>
  );
};

export default Page;
