"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteAuthorById } from "@/actions/admin/author";
import { deleteCategoryById } from "@/actions/admin/category";
import type { Author, Category } from "@prisma/client";
import { Ellipsis, Loader2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

interface CategoryOrAuthorCardActionsProps {
  type: "category" | "author";
  item: Category | Author;
}

export function CardActions({ item, type }: CategoryOrAuthorCardActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);
  const editLink = `/admin/books/${type == "author" ? "authors" : "categories"}/${item.id}/edit`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center">
          <Ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            asChild
            className="flex cursor-pointer items-center text-gray-700 focus:text-gray-700"
          >
            <Link href={editLink}>Edit </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this {type}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can`&apos;`t undo this action later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event: any) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                let deleted;
                if (type == "category") {
                  deleted = await deleteCategoryById({
                    id: item.id,
                  });
                } else {
                  deleted = await deleteAuthorById({
                    id: item.id,
                  });
                }

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                }
              }}
            >
              {isDeleteLoading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2Icon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
