"use server";

import db from "@/db";

export type BookType = {
  id: string;
  title: string;
  author: string;
  category: string;
  publicationDate: string;
  description: string;
  isbn: string;
  availableCopies: number;
  pictureUrl: string;
};

async function searchBooks(query: string) {
  return db.book.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { author: { name: { contains: query } } },
        { category: { name: { contains: query } } },
      ],
    },
    include: { author: true, category: true },
  });
}

export async function isBookAvailableForLoan(bookId: string): Promise<boolean> {
  try {
    const book = await db.book.findUnique({
      where: { id: bookId },
      include: {
        loans: {
          where: {
            returnedAt: null,
          },
        },
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    const availableCopies = book.copies - book.loans.length;

    return availableCopies > 0;
  } catch (error) {
    console.error("Error checking book availability:", error);
    throw error;
  }
}
