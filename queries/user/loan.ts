import "server-only";
import "server-only";
import db from "@/db/db";
import { type Loan, LoanStatus } from "@prisma/client";

export async function getAllLoans(): Promise<Loan[]> {
  return db.loan.findMany({
    include: {
      user: true,
      book: true,
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

export async function getLoansByUser(userId: string): Promise<LoanedBook[]> {
  const loans = await db.loan.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      bookId: true,
      book: {
        select: {
          title: true,
        },
      },
      user: { select: { name: true } },
      status: true,
      loanedAt: true,
      dueDate: true,
      returnedAt: true,
    },
  });

  return loans.map((loan) => ({
    id: loan.id,
    userName: loan.user.name ?? "n/a",
    bookId: loan.bookId,
    bookTitle: loan.book.title,
    loanStatus: loan.status,
    loanedAt: loan.loanedAt,
    dueDate: loan.dueDate,
    returnedAt: loan.returnedAt,
  }));
}

export async function getActiveLoans(): Promise<Loan[]> {
  return db.loan.findMany({
    where: {
      returnedAt: null,
    },
    include: {
      user: true,
      book: true,
    },
  });
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

export async function getOverdueLoans(): Promise<Loan[]> {
  const currentDate = new Date();
  return db.loan.findMany({
    where: {
      dueDate: {
        lt: currentDate,
      },
      returnedAt: null,
    },
    include: {
      user: true,
      book: true,
    },
  });
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

export async function extendLoanDueDate(
  loanId: string,
  newDueDate: Date,
): Promise<Loan> {
  return db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      dueDate: newDueDate,
    },
  });
}

export async function getLoanDetails(loanId: string): Promise<Loan | null> {
  return db.loan.findUnique({
    where: {
      id: loanId,
    },
    include: {
      user: true,
      book: true,
    },
  });
}

export async function deleteLoan(loanId: string): Promise<Loan> {
  return db.loan.delete({
    where: {
      id: loanId,
    },
  });
}
