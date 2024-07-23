import { getLoansByUser } from "@/actions/user/loan";
import { getUser } from "@/actions/user/user";
import AllLoansSection from "@/components/admin/Sections/AllLoansSection";

export default async function UserReservedBooks() {
  const user = await getUser();
  const loanedBooks = await getLoansByUser(user);
  return <AllLoansSection loans={loanedBooks} />;
}
