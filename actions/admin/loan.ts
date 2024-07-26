"use server";
import db from "@/db/db";
import { Loan } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function approveLoan(loanId: string): Promise<void> {
  await db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      loanedAt: new Date(),
      status: "ACTIVE",
    },
  });
  revalidatePath("/admin/loans");
}

export async function cancelLoan(loanId: string): Promise<void> {
  await db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  revalidatePath("/admin/loans");
}

export async function returnLoan(loanId: string): Promise<void> {
  await db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      status: "RETURNED",
      returnedAt: new Date(),
    },
  });
  revalidatePath("/admin/loans");
}

export async function extendLoanDueDate(
  loanId: string,
  newDueDate: Date,
): Promise<void> {
  db.loan.update({
    where: {
      id: loanId,
    },
    data: {
      dueDate: newDueDate,
    },
  });
  revalidatePath("/admin/loans");
}

export async function deleteLoan(loanId: string): Promise<void> {
  db.loan.delete({
    where: {
      id: loanId,
    },
  });
  revalidatePath("/admin/loans");
}
