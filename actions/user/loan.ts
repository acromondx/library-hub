"use server";
import db from "@/db/db";
import { type Loan, LoanStatus } from "@prisma/client";

export async function createLoan({
  userId,
  bookId,
  dueDate,
}: {
  userId: string;
  bookId: string;
  dueDate: Date;
}): Promise<Loan> {
  dueDate.setDate(dueDate.getDate() + 3);
  return db.loan.create({
    data: {
      userId,
      bookId,
      dueDate,
    },
  });
}

export interface LoanedBook {
  id: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  loanStatus: LoanStatus;
  loanedAt: Date | null;
  dueDate: Date | null;
  returnedAt: Date | null;
}

export async function isLoanSubmitted({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}): Promise<boolean> {
  const loan = await db.loan.findFirst({
    where: {
      userId: userId,
      bookId: bookId,
      status: {
        in: [LoanStatus.PENDING, LoanStatus.ACTIVE, LoanStatus.OVERDUE],
      },
    },
  });

  return !!loan;
}

export async function returnBook(loanId: string): Promise<Loan> {
  return db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      returnedAt: new Date(),
    },
  });
}
