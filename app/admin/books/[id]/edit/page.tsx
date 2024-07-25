import { getAllAuthors } from "@/queries/admin/author";
import { getBookById } from "@/queries/admin/book";
import { getAllCategories } from "@/queries/admin/category";
import { AddOrUpdateBookForm } from "@/components/admin/Forms/AddOrUpdateBookForm";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const [book, categories, authors] = await Promise.all([
    getBookById({ id: params.id }),
    getAllCategories(),
    getAllAuthors(),
  ]);

  return (
    <div className="px-2">
      <DashboardHeader title="Edit Book">
        {/* <LinkButton
          title="Add Book"
          href="/admin/books/new"
          icon={PlusCircleIcon}
        /> */}
      </DashboardHeader>

      {/* <div>{JSON.stringify(book)}</div> */}

      <AddOrUpdateBookForm
        book={book}
        authors={authors}
        categories={categories}
      />
    </div>
  );
}
