"use server";

import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/lib/firebase";
import { AddBookSchema, UpdateBookSchema } from "@/lib/schema/admin";
import { z } from "zod";

export async function addBook(rawData: z.infer<typeof AddBookSchema>) {
  const data = AddBookSchema.parse(rawData);

  try {
    let pictureUrl = "";

    if (data.image) {
      const fileRef = ref(imageDb, `libraryhub/${crypto.randomUUID()}`);
      await uploadBytes(fileRef, data.image);
      pictureUrl = await getDownloadURL(fileRef);
    }

    await db.book.create({
      data: {
        title: data.title,
        description: data.description,
        copies: data.copies,
        isbn: data.isbn,
        publishedAt: data.publishedAt,
        authorId: data.authorId,
        categoryId: data.categoryId,
        pictureUrl: pictureUrl,
      },
    });

    revalidatePath("/admin/books");
    redirect("/admin/books");
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error((error as Error).message);
  }

  // } catch (error) {
  //   if (
  // error instanceof PrismaClientKnownRequestError &&
  // error.code === "P2002"
  //   ) {
  //     if (error.meta?.target === "Book_isbn_key") {
  //       console.error("ISBN already exists:", error);
  //       return { isbn: "A book with this ISBN already exists." };
  //     }
  //   } else {
  //     console.error("Error adding book:", error);
  //     throw new Error((error as Error).message);
  //   }
  // }
}

export async function updateBook(
  id: string,
  rawData: z.infer<typeof UpdateBookSchema>,
) {
  const data = UpdateBookSchema.parse(rawData);

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
    authorId: data.authorId,
    categoryId: data.categoryId,
  };

  if (data.image) {
    if (data.image.type.startsWith("image/")) {
      console.log("🔥 firebase ++++++++++");
      const fileRef = ref(imageDb, `libraryhub/${crypto.randomUUID()}`);
      await uploadBytes(fileRef, data.image);
      const pictureUrl = await getDownloadURL(fileRef);
      updateData.pictureUrl = pictureUrl;
    }
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

export async function getBookById({ id }: { id: string }) {
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

export async function deleteBookById(id: string) {
  const book = await db.book.delete({
    where: { id },
  });

  if (book == null) return notFound();

  revalidatePath("/admin/books");
}
