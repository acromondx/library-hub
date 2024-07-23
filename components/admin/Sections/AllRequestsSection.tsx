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
import { Badge } from "@/components/ui/badge";
import { wordifyDate } from "@/lib/utils";
import type { RequestStatus } from "@prisma/client";
import { Check, Eye, X } from "@phosphor-icons/react";
import {
  IRequest,
  approveRequest,
  declineRequest,
} from "@/actions/admin/requests";
import TruncatedText from "@/components/shared/TruncatedText";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function colorifyStatus(status: RequestStatus) {
  switch (status) {
    case "PENDING":
      return "bg-amber-600/[0.1] rounded shadow-none border-amber-600/[0.2] text-xs font-normal uppercase text-amber-600";
    case "ADDRESSED":
      return "bg-green-500/[0.1] rounded shadow-none border-green-500/[0.2] text-xs font-normal uppercase text-green-500";
    case "DECLINED":
      return "bg-destructive/[0.1] rounded shadow-none border-destructive/[0.2] text-xs font-normal uppercase text-destructive";
    case "APPROVED":
      return "bg-primary/[0.1] rounded shadow-none border-primary/[0.2] text-xs font-normal uppercase text-primary";
    default:
      return "";
  }
}

export const columns: ColumnDef<IRequest>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {wordifyDate(row.getValue("createdAt")) ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => <div>{row.getValue("userName")}</div>,
  },

  {
    accessorKey: "type",
    header: "Request Type",
    cell: ({ row }) => (
      <Badge className="rounded border-gray-700/[0.2] bg-white text-xs font-normal uppercase text-gray-700 shadow-none">
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Book",
    cell: ({ row }) => <TruncatedText text={row.getValue("description")} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={colorifyStatus(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="flex gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button variant="outline" size="icon">
                  <Eye className="size-4" />
                </Button>{" "}
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={rowData.userPicture} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">{rowData.userName}</div>
                    <div className="text-xs text-muted-foreground">
                      Date: {wordifyDate(rowData.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="mb-4">
                  <div className="font-medium">Request Type</div>
                  <div>{rowData.type}</div>
                </div>
                <div className="mb-4">
                  <div className="font-medium">Description</div>
                  <div>{rowData.description}</div>
                </div>
                <div>
                  <div className="font-medium">Status</div>
                  <Badge
                    variant="secondary"
                    className={colorifyStatus(rowData.status)}
                  >
                    {rowData.status}
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            disabled={
              rowData.status === "APPROVED" || rowData.status === "ADDRESSED"
            }
            onClick={async () => await approveRequest({ id: rowData.id })}
          >
            <Check />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={rowData.status === "DECLINED"}
            onClick={async () => await declineRequest({ id: rowData.id })}
          >
            <X />
          </Button>
        </div>
      );
    },
  },
];

export default function AllRequestsSection({
  requests,
}: {
  requests: IRequest[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: requests,
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
            placeholder="Filter by user Name..."
            type="search"
            value={
              (table.getColumn("userName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("userName")?.setFilterValue(event.target.value)
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
