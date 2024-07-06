import { DashboardHeader } from "../../components/DashboardHeader";
import { PlusCircleIcon } from "lucide-react";
import { LinkButton } from "@/components/buttons";
import { CategoryOrAuthorCard } from "../../components/CategoryOrAuthorCard";
import { getAllAuthors } from "../../actions/author";

export default async function NewProductPage() {
  const authors = await getAllAuthors();

  return (
    <>
      <DashboardHeader title="Authors">
        <LinkButton
          title="Add author"
          href="/admin/books/authors/new"
          icon={PlusCircleIcon}
        />
      </DashboardHeader>

      <div className="grid grid-cols-1 gap-6 pb-8 pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {authors && authors.length > 0 ? (
          authors.map((author) => (
            <CategoryOrAuthorCard
              key={author.id}
              item={author}
              type="author"
              books={author.books.length}
            />
          ))
        ) : (
          <p>Category is empty</p>
        )}
      </div>
    </>
  );
}
