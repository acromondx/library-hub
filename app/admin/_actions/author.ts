"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const addSchema = z.object({
  name: z.string().min(5).trim(),
});

export async function addAuthor(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.author.create({
    data: {
      name: data.name,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/books/authors");
}

const editSchema = addSchema.extend({});

export async function updateAuthor(
  id: number,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const author = await db.author.findUnique({ where: { id } });

  if (author == null) return notFound();

  await db.author.update({
    where: { id },
    data: {
      name: data.name,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function getAllAuthors() {
  const authors = await db.author.findMany({ include: { books: true } });
  return authors;
}

export async function deleteAuthorById({ id }: { id: number }) {
  const author = await db.author.delete({ where: { id } });

  if (author == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}
