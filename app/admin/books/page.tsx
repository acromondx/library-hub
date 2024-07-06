import { PlusCircleIcon } from "lucide-react";
import { LinkButton } from "@/components/buttons";
import AllBooksSection from "../components/AllBooksSection";
import { DashboardHeader } from "../components/DashboardHeader";
import { getAllBooks } from "../actions/book";

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
