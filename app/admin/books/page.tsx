"use client";

import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { PlusCircleIcon, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LinkButton } from "@/components/buttons";

interface Votes {
  id: number;
  title: string;
  isbn: string;
  copies: number;
  contestId: number;
  author: string;
  category: string;
  categoryId: number;
  votedAt: string;
  mode: "Website" | "USSD";
}

// model Book {
//   publishedAt  DateTime
//   authorId     Int
//   loans        Loan[]        @relation("BookLoans")
//   reservations Reservation[]
//   createdAt    DateTime      @default(now())
//   updatedAt    DateTime      @updatedAt
// }

const votesData: Votes[] = [
  {
    id: 101,
    title: "The subtle art of not giving a Fuck",
    isbn: "024-124",
    copies: 2,
    contestId: 92,
    author: "Babad we",
    category: "Fictio",
    categoryId: 91,
    votedAt: "2024-01-28T20:53:52.000Z",
    mode: "Website",
  },
  {
    id: 10,
    title: "AKI-Ola Maths",
    isbn: "024-124",
    copies: 2,
    contestId: 92,
    author: "Babad we",
    category: "Fictio",
    categoryId: 91,
    votedAt: "2024-01-28T20:53:52.000Z",
    mode: "Website",
  },
  {
    id: 11,
    title: "AKI-Ola Maths",
    isbn: "024-124",
    copies: 2,
    contestId: 92,
    author: "Babad we",
    category: "Fictio",
    categoryId: 91,
    votedAt: "2024-01-28T20:53:52.000Z",
    mode: "Website",
  },
  {
    id: 1,
    title: "AKI-Ola Maths",
    isbn: "024-124",
    copies: 2,
    contestId: 92,
    author: "Babad we",
    category: "Fictio",
    categoryId: 91,
    votedAt: "2024-01-28T20:53:52.000Z",
    mode: "Website",
  },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

export const columns: ColumnDef<Votes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessorKey: "votedAt",
  //   header: "Date",
  //   cell: ({ row }) => <div>{formatDate(row.getValue("votedAt"))}</div>,
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <div className="lowercase">{row.getValue("isbn")}</div>,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "mode",
    header: "Mode",
    cell: ({ row }) => (
      <Badge className="bg-primary/[0.15] text-xs font-normal uppercase text-primary">
        {row.getValue("mode")}
      </Badge>

      // <div
      //   className={`capitalize rounded-xl min-w-min text-center font-bold  ${getBackgroundColor(
      //     row.getValue('mode')
      //   )}`}
      // >
      //   {row.getValue('mode')}
      // </div>
    ),
  },

  {
    accessorKey: "copies",
    header: () => <div className="text-center">Total Votes</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("copies"));

      // const formatted = new Intl.NumberFormat('en-GH', {
      //   style: 'currency',
      //   currency: 'GHS',
      // }).format(amount);

      return <div className="text-center font-medium">{amount}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vote = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ContestAnalyticsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();
  const urlParams = useParams();

  const table = useReactTable({
    data: votesData!,
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
      <DashboardHeader title="Books">
        <LinkButton
          title="Add Book"
          href="/admin/books/new"
          icon={PlusCircleIcon}
        />
      </DashboardHeader>

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
      <div className="rounded-md border">
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

export function DashboardHeader({
  title,
  showSeperator = true,
  children,
}: {
  title: string;
  showSeperator?: boolean;
  children?: React.ReactElement;
}) {
  return (
    <>
      <div className="flex justify-between pb-4">
        <h3 className="pt-2 text-[17px] font-semibold tracking-tight">
          {title}
        </h3>

        {children}
      </div>
      {showSeperator && <Separator className="mb-4" />}
    </>
  );
}
