import db from "@/db/db";
import type { Loan } from "@prisma/client";

// Create a new loan
async function createLoan(
  userId: string,
  bookId: string,
  dueDate: Date,
): Promise<Loan> {
  return db.loan.create({
    data: {
      userId,
      bookId,
      dueDate,
    },
  });
}

// Get all loans
async function getAllLoans(): Promise<Loan[]> {
  return db.loan.findMany({
    include: {
      user: true,
      book: true,
    },
  });
}

// Get loans by user
async function getLoansByUser(userId: string): Promise<Loan[]> {
  return db.loan.findMany({
    where: {
      userId: userId,
    },
    include: {
      book: true,
    },
  });
}

// Get active loans (not returned)
async function getActiveLoans(): Promise<Loan[]> {
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

// Get overdue loans
async function getOverdueLoans(): Promise<Loan[]> {
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

// Return a book
async function returnBook(loanId: string): Promise<Loan> {
  return db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      returnedAt: new Date(),
    },
  });
}

// Extend loan due date
async function extendLoanDueDate(
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

// Get loan details
async function getLoanDetails(loanId: string): Promise<Loan | null> {
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

// Delete a loan (use with caution)
async function deleteLoan(loanId: string): Promise<Loan> {
  return db.loan.delete({
    where: {
      id: loanId,
    },
  });
}
