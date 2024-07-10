"use server";
import db from "@/db/db";
import { SubmitRequestSchema } from "@/lib/schema/user";
import {
  Author,
  Book,
  Category,
  Loan,
  RequestType,
  Reservation,
} from "@prisma/client";
import { z } from "zod";

export interface IBook {
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

interface ExtendedBook extends Book {
  author: Author;
  category: Category;
  loans: Loan[];
}

export const getAllBooks = async (): Promise<IBook[]> => {
  const books: ExtendedBook[] = await db.book.findMany({
    include: {
      author: true,
      category: true,
      loans: {
        where: {
          returnedAt: null,
        },
      },
    },
  });

  const formattedBooks: IBook[] = books.map((book) => {
    const loanedCopies = book.loans.length;
    const availableCopies = book.copies - loanedCopies;

    return {
      id: book.id,
      title: book.title,
      author: book.author.name,
      category: book.category.name,
      publicationDate: book.publishedAt.toISOString().split("T")[0],
      description: book.description,
      isbn: book.isbn,
      availableCopies: availableCopies,
      pictureUrl: book.pictureUrl,
    };
  });

  return formattedBooks;
};

export const reserveBook = async (
  userId: string,
  bookId: string,
  expiresAt: Date,
): Promise<Reservation> => {
  const reservation = await db.reservation.create({
    data: {
      userId,
      bookId,
      expiresAt,
    },
  });
  return reservation;
};

export const getAllReservedBooksByUser = async (
  userId: string,
): Promise<Reservation[]> => {
  const reservations = await db.reservation.findMany({
    where: { userId },
    include: {
      book: true,
    },
  });
  return reservations;
};

export const getAllLoansByUser = async (userId: string): Promise<Loan[]> => {
  const loans = await db.loan.findMany({
    where: { userId },
    include: {
      book: true,
    },
  });
  return loans;
};

export const requestBook = async (
  userId: string,
  type: RequestType,
  description: string,
) => {
  const request = await db.request.create({
    data: {
      userId,
      type,
      description,
    },
  });
  return request;
};

export const getAllRequestsByUser = async (userId: string) => {
  const requests = await db.request.findMany({
    where: { userId },
  });
  return requests;
};

export async function submitRequest(
  rawData: z.infer<typeof SubmitRequestSchema>,
) {
  console.log(rawData);
  console.log("---");

  const data = SubmitRequestSchema.parse(rawData);
  console.log(data);
  console.log("---");

  try {
    await db.request.create({
      data: {
        userId: data.userId,
        description: data.description,
        type: data.requestType,
      },
    });
    console.log("--- request created");
  } catch (error) {
    console.log("--- request error");
    console.log((error as Error).message);
  }
}
