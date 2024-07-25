import { getLoansByUser } from "@/queries/user/loan";
import { getUser } from "@/queries/user/user";
import UserLoanedBookSection from "@/components/user/Sections/UserLoanedBooksSection";

export default async function UserReservedBooks() {
  const user = await getUser();
  const loanedBooks = await getLoansByUser(user);
  return <UserLoanedBookSection loanedBooks={loanedBooks} />;
}
