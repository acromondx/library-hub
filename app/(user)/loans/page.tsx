import { getLoansByUser } from "@/actions/user/loan";
import { getUser } from "@/actions/user/user";
import UserLoanedBookSection from "@/components/user/Sections/UserLoanedBooksSection";

export default async function UserReservedBooks() {
  const user = await getUser();
  const loanedBooks = await getLoansByUser(user);
  return <UserLoanedBookSection loanedBooks={loanedBooks} />;
}
