import "server-only";
import db from "@/db";
import { Errors } from "@/lib/errors";
import { AddCategorySchema } from "@/lib/schema/admin";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

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
