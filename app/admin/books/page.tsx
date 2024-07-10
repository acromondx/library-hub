import { PlusCircleIcon } from "lucide-react";
import { LinkButton } from "@/components/shared/buttons";
import AllBooksSection from "@/components/admin/Sections/AllBooksSection";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getAllBooks } from "@/actions/admin/book";

export default async function NewProductPage() {
  const books = await getAllBooks();

  return (
    <>
      <DashboardHeader title="Books">
        <LinkButton
          title="Add Book"
          href="/admin/books/new"
          icon={PlusCircleIcon}
        />
      </DashboardHeader>

      <AllBooksSection books={books} />
    </>
  );
}
