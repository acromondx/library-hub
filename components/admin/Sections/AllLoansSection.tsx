"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import type { LoanedBook } from "@/actions/user/loan";
import { Badge } from "@/components/ui/badge";
import { wordifyDate } from "@/lib/utils";
import type { LoanStatus } from "@prisma/client";
import { CalendarBlank, Check } from "@phosphor-icons/react";

function colorifyStatus(status: LoanStatus) {
  switch (status) {
    case "PENDING":
      return "bg-amber-600/[0.1] rounded shadow-none border-amber-600/[0.2] text-xs font-normal uppercase text-amber-600";
    case "ACTIVE":
      return "bg-green-500/[0.1] rounded shadow-none border-green-500/[0.2] text-xs font-normal uppercase text-green-500";
    case "CANCELLED":
      return "bg-gray-600/[0.1] rounded shadow-none border-gray-600/[0.2] text-xs font-normal uppercase text-gray-600";
    case "OVERDUE":
      return "bg-destructive/[0.1] rounded shadow-none border-destructive/[0.2] text-xs font-normal uppercase text-destructive";
    case "RETURNED":
      return "bg-primary/[0.1] rounded shadow-none border-primary/[0.2] text-xs font-normal uppercase text-primary";
    default:
      return "";
  }
}
export const columns: ColumnDef<LoanedBook>[] = [
    {
        accessorKey: "userName",
        header: "User",
        cell: ({ row }) => <div>{row.getValue("userName")}</div>,
      },
    {
    accessorKey: "bookTitle",
    header: "Book",
    cell: ({ row }) => <div>{row.getValue("bookTitle")}</div>,
  },
  {
    accessorKey: "loanStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={colorifyStatus(row.getValue("loanStatus"))}>
        {row.getValue("loanStatus")}
      </Badge>
    ),
  },
  {
    accessorKey: "loanedAt",
    header: "Loaned At",
    cell: ({ row }) => (
      <div className="capitalize">
        {wordifyDate(row.getValue("loanedAt")) ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {wordifyDate(row.getValue("dueDate")) ?? "N/A"}
      </div>
    ),
  },

  {
    accessorKey: "returnedAt",
    header: "Returned At",
    cell: ({ row }) => (
      <div className="capitalize">
        {wordifyDate(row.getValue("returnedAt")) ?? "N/A"}
      </div>
    ),
  },

    {
      id: "actions",
      header:'Actions',
      enableHiding: false,
      cell: ({ row }) => (

        <div className="flex gap-1">
            <Button variant='outline' size='icon'><Check/></Button>
            <Button variant='outline' size='icon'><CalendarBlank/></Button>

        </div>
      ),
    },
];

export default function AllLoansSection({
  loans,
}: { loans: LoanedBook[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: loans,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="mx-1 flex items-center py-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by ISBN..."
            type="search"
            value={(table.getColumn("isbn")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("isbn")?.setFilterValue(event.target.value)
            }
            className="max-w-sm appearance-none bg-background pl-8 shadow-none"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" size={"sm"}>
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
