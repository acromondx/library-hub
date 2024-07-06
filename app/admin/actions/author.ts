"use server";

import db from "@/db/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddAuthorSchema } from "@/lib/Validations/author";

export async function addAuthor(rawInput: z.infer<typeof AddAuthorSchema>) {
  // const result = AddAuthorSchema.safeParse(
  //   Object.fromEntries(formData.entries()),
  // );
  const input = AddAuthorSchema.parse(rawInput);

  try {
    await db.author.create({
      data: {
        name: input.name,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/books/authors");
}

const editSchema = AddAuthorSchema.extend({});

export async function updateAuthor(
  id: string,
  rawInput: z.infer<typeof AddAuthorSchema>,
) {
  const input = AddAuthorSchema.parse(rawInput);
  const author = await db.author.findUnique({ where: { id } });

  if (author) {
    await db.author.update({
      where: { id },
      data: {
        name: input.name,
      },
    });
  }

  revalidatePath("/admin/books/authors");
  redirect("/admin/books/authors");
}

export async function getAuthorById({ id }: { id: string }) {
  console.log("Fetching author with ID:", id);

  const author = await db.author.findFirst({
    where: { id },
  });
  if (!author) {
    console.error("Author not found");
    throw new Error("Author not found");
  }
  return author;
}

export async function getAllAuthors() {
  const authors = await db.author.findMany({ include: { books: true } });

  return authors;
}

export async function deleteAuthorById({ id }: { id: string }) {
  try {
    await db.author.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        console.error(
          "Cannot delete author. It is referenced by a book:",
          error,
        );
        throw new Error((error as Error).message);
      }
    } else {
      console.error("Error deleting author:", error);
      throw new Error((error as Error).message);
    }
  }

  revalidatePath("/admin/books/authors");
}
