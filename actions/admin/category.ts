"use server";

import db from "@/db/db";
import { Errors } from "@/lib/errors";
import { AddCategorySchema } from "@/lib/schema/admin";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

export async function addCategory(rawInput: z.infer<typeof AddCategorySchema>) {
  // const result = AddCategorySchema.safeParse(
  //   Object.fromEntries(formData.entries()),
  // );
  const input = AddCategorySchema.parse(rawInput);

  try {
    await db.category.create({
      data: {
        name: input.name,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(Errors.itemAlreadyExists);
      }
    }
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/books/categories");
}

const editSchema = AddCategorySchema.extend({});

export async function updateCategory(
  id: string,
  rawInput: z.infer<typeof AddCategorySchema>,
) {
  const input = AddCategorySchema.parse(rawInput);
  const category = await db.category.findUnique({ where: { id } });

  if (category) {
    await db.category.update({
      where: { id },
      data: {
        name: input.name,
      },
    });
  }

  revalidatePath("/admin/books/categories");
  redirect("/admin/books/categories");
}

export async function getCategoryById({ id }: { id: string }) {
  console.log("Fetching category with ID:", id);

  const category = await db.category.findFirst({
    where: { id },
  });
  if (!category) {
    console.error("Category not found");
    throw new Error("Category not found");
  }
  return category;
}

export async function getAllCategories() {
  const categories = await db.category.findMany({ include: { books: true } });

  return categories;
}

export async function deleteCategoryById({ id }: { id: string }) {
  try {
    await db.category.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        console.error(
          "Cannot delete category. It is referenced by a book:",
          error,
        );
        throw new Error((error as Error).message);
      }
    } else {
      console.error("Error deleting category:", error);
      throw new Error((error as Error).message);
    }
  }

  revalidatePath("/admin/books/categories");
}
