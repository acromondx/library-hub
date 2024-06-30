"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const addSchema = z.object({
  name: z.string().min(1),
});

export async function addCategory(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);

  await db.category.create({
    data: {
      name: data.name,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/books/categories");
}

const editSchema = addSchema.extend({});

export async function updateCategory(
  id: number,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const category = await db.category.findUnique({ where: { id } });

  if (category == null) return notFound();

  await db.category.update({
    where: { id },
    data: {
      name: data.name,
    },
  });

  revalidatePath("/admin/books/categories");
  redirect("/admin/books/categories");
}

export async function getAllCategories() {
  const categories = await db.category.findMany({ include: { books: true } });
  return categories;
}

export async function getCategoryById({ id }: { id: number }) {
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

export async function deleteCategoryById({ id }: { id: number }) {
  const category = await db.category.delete({ where: { id } });

  if (category == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}
