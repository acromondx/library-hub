import { DashboardHeader } from "@/app/admin/components/DashboardHeader";
import { AddOrUpdateBookForm } from "@/app/admin/components/AddOrUpdateBookForm";
import { getBookById } from "@/app/admin/actions/book";
import { getAllCategories } from "@/app/admin/actions/category";
import { getAllAuthors } from "@/app/admin/actions/author";

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
