import db from "@/db/db";
import { Loan } from "@prisma/client";

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

export async function deleteLoan(loanId: string): Promise<Loan> {
  return db.loan.delete({
    where: {
      id: loanId,
    },
  });
}
