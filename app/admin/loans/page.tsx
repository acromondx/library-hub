import { getLoansByUser } from "@/queries/user/loan";
import AllLoansSection from "@/components/admin/Sections/AllLoansSection";

export default async function UserReservedBooks() {
  const loanedBooks = await getLoansByUser();
  return <AllLoansSection loans={loanedBooks} />;
}
