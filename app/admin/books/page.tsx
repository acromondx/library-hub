import { PlusCircleIcon } from "lucide-react";
import { LinkButton } from "@/components/buttons";
import AllBooksSection from "../_components/AllBooksSection";
import { DashboardHeader } from "../_components/DashboardHeader";
import { getAllBooks } from "../_actions/book";
import { getAllCategories } from "../_actions/category";
import { getAllAuthors } from "../_actions/author";

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
