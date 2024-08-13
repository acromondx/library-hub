"use server";
import db from "@/db";
import { SubmitRequestSchema } from "@/lib/schema/user";
import type { Author, Book, Category, Loan, RequestType } from "@prisma/client";
import type { z } from "zod";
import { getCurrentUser } from "./auth";

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

export async function submitRequest(
  rawData: z.infer<typeof SubmitRequestSchema>,
) {
  const data = SubmitRequestSchema.parse(rawData);

  const user = await getCurrentUser();
  try {
    await db.request.create({
      data: {
        userId: user.id,
        description: data.description,
        type: data.requestType,
      },
    });

    console.log("--- request created");
  } catch (error) {
    console.log("--- request error");
    console.log(error);
    throw new Error("An error occured");
  }
}
