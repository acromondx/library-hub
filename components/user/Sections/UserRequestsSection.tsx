"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Request, RequestStatus } from "@prisma/client";
import { wordifyDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { LinkButton } from "@/components/shared/buttons";
import { Plus } from "@phosphor-icons/react";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

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

export const columns: ColumnDef<Request>[] = [


  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => 
  <Tooltip>
    <TooltipTrigger className="w-22">{wordifyDate(row.getValue("createdAt"))}</TooltipTrigger>
    <TooltipContent>
      <p>{formatDate(row.getValue("createdAt"))}</p>
    </TooltipContent>
  </Tooltip>

  },
//   {
//     accessorKey: "id",
//     header: "ID",
//     cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
//   },
  {
    accessorKey: "type",
    header: "Request Type",
    cell: ({ row }) => (
      <Badge className=" bg-white rounded shadow-none border-gray-700/[0.2] text-xs font-normal uppercase text-gray-700">
        {(row.getValue("type") )}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div >
        {(row.getValue("description"))}
      </div>
    ),
  },



  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={colorifyStatus(row.getValue("status") )}>
        {(row.getValue("status") )}
      </Badge>
    ),
  
  },

  
];

export default function UserRequestsSection({ requests }: { requests: Request[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
        <DashboardHeader title="Requests" >
            <LinkButton title="New" href="/requests/new" icon={Plus}/>
        </DashboardHeader>
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
