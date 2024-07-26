import "server-only";
import db from "@/db/db";

export async function getAllLoans() {
  const loans = await db.loan.findMany({
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
    orderBy: { createdAt: "asc" },
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
