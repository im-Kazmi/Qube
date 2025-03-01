import React from "react";
import { ColumnDef, DataTable } from "../data-table";
import { DataTableColumnHeader } from "../data-table/helpers";
import { Checkbox } from "../ui/checkbox";

// Sample data for the results table
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    order_date: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    order_date: "2023-06-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    order_date: "2023-07-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    order_date: "2023-08-05",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    order_date: "2023-09-12",
  },
];

type User = {
  id: number;
  name: string;
  email: string;
  order_date: string;
};
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
];

export function ResultsTable() {
  return (
    <div className="h-full flex flex-col   overflow-hidden p-5">
      <DataTable data={sampleData} columns={columns} isLoading={false} />
    </div>
  );
}
