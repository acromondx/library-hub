"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/lib/firebase";

const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));

const addSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  isbn: z
    .string()
    .min(5, { message: "ISBN must be at least 5 characters long" }),
  publishedAt: z.coerce.date().transform((date) => new Date(date)),
  copies: z.coerce
    .number()
    .int()
    .min(1, { message: "At least one copy is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(680, { message: "Description too long" }),

  image: imageSchema,
});

export async function addBook(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    const fileRef = ref(imageDb, `libraryhub/${crypto.randomUUID()}`);
    await uploadBytes(fileRef, data.image);
    const pictureUrl = await getDownloadURL(fileRef);

    await db.book.create({
      data: {
        title: data.title,
        description: data.description,
        copies: data.copies,
        isbn: data.isbn,
        publishedAt: data.publishedAt,
        authorId: 1,
        categoryId: 62,
        pictureUrl: pictureUrl,
      },
    });

    revalidatePath("/admin/books");
    redirect("/admin/books");
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error((error as Error).message);
  }
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
  // authorId: z.number().int().min(1, { message: "Author is required" }),
  // categoryId: z.number().int().min(1, { message: "Category is required" }),
});

export async function updateBook(
  id: number,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  console.log("zod ++++++++++");
  console.log(data);
  console.log("++++++++++");

  const book = await db.book.findUnique({ where: { id } });
  if (book == null) return notFound();

  let updateData: any = {
    title: data.title,
    copies: data.copies,
    description: data.description,
    publishedAt: data.publishedAt,
    isbn: data.isbn,
    authorId: 1,
    categoryId: 72,
  };

  if (data.image?.type.startsWith("image/")) {
    console.log("🔥 firebase ++++++++++");
    const fileRef = ref(imageDb, `libraryhub/${crypto.randomUUID()}`);
    await uploadBytes(fileRef, data.image);
    const pictureUrl = await getDownloadURL(fileRef);
    updateData.pictureUrl = pictureUrl;
  }

  console.log("prisma ++++++++++");
  console.log(updateData);

  await db.book.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/books");
  redirect("/admin/books");
}

export async function getAllBooks() {
  const books = await db.book.findMany({
    include: { author: true, category: true },
  });
  return books;
}

export async function getBookById({ id }: { id: number }) {
  console.log("Fetching book with ID:", id);

  const book = await db.book.findFirst({
    where: { id },
    include: { author: true, category: true },
  });
  if (!book) {
    console.error("Book not found");
    throw new Error("Book not found");
  }
  return book;
}

export async function deleteBookById(id: number) {
  const book = await db.book.delete({
    where: { id },
  });

  if (book == null) return notFound();

  revalidatePath("/admin/books");
}
