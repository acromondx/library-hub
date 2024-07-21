import { getReservedBooksByUser } from "@/actions/user/reservation";
import { getUser } from "@/actions/user/user";
import EmptyState from "@/components/shared/EmptyState";
import { ReservedBooksTable } from "@/components/user/Sections/ReservedBooksTable";
import { BookIcon } from "lucide-react";

export default async function page() {
  const user = await getUser();
  const reservedBooks = await getReservedBooksByUser({ userId: user });

  return <ReservedBooksTable userId={user} reservedBooks={reservedBooks} />}
