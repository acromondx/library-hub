import "server-only";
import db from "@/db/db";

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
