"use server";

import db from "@/db/db";

export type BookType =  {
  id: string;
  title: string;
  author: string;
  category: string;
  publicationDate: string;
  description: string;
  isbn: string;
  availableCopies: number;
  pictureUrl: string;
}

export async function getBookById(id: string): Promise<BookType> {
  const book = await db.book.findFirst({
    where: { id },
    include: { author: true, category: true },
  });
  if (!book) {
    throw new Error(`Book not found with ID: ${id}`);
  }
  return {
    id: book.id,
    title: book.title,
    author: book.author.name,
    category: book.category.name,
    publicationDate: book.publishedAt.toISOString().split("T")[0],
    description: book.description,
    isbn: book.isbn,
    availableCopies: book.copies,
    pictureUrl: book.pictureUrl,
  };
}
