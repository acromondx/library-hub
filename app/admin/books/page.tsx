import { getAllBooks } from "@/queries/admin/book";
import AllBooksSection from "@/components/admin/Sections/AllBooksSection";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { LinkButton } from "@/components/shared/buttons";
import { PlusCircleIcon } from "lucide-react";

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
