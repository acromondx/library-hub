import { getLoansByUser } from "@/queries/user/loan";
import UserLoanedBookSection from "@/components/user/Sections/UserLoanedBooksSection";

export default async function UserReservedBooks() {
  const loanedBooks = await getLoansByUser();
  return <UserLoanedBookSection loanedBooks={loanedBooks} />;
}
