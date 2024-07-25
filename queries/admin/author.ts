import "server-only";
import db from "@/db/db";
import { AddAuthorSchema } from "@/lib/schema/admin";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

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
