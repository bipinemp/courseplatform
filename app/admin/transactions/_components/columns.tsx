"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type TTransaction = {
  email: string;
  status: string;
  amount: string;
};

export const columns: ColumnDef<TTransaction>[] = [
  {
    accessorKey: "email",
    header: "User",
  },
  {
    accessorKey: "status",
    header: "Payment Status",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("np", {
        style: "currency",
        currency: "NPR",
        maximumFractionDigits: 0,
      }).format(price);

      return (
        <div className="opacit-80 text-center font-semibold">{formatted}</div>
      );
    },
  },
];
