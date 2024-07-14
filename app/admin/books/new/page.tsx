import { getAllAuthors } from "@/actions/admin/author";
import { getAllCategories } from "@/actions/admin/category";
import { AddOrUpdateBookForm } from "@/components/admin/Forms/AddOrUpdateBookForm";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { BackButton } from "@/components/shared/buttons";

export default async function Dashboard() {
  const [categories, authors] = await Promise.all([
    getAllCategories(),
    getAllAuthors(),
  ]);

  return (
    <div className="px-2">
      <BackButton href="/admin/books" ghost />
      <DashboardHeader title="Add a book" showSeperator={false} />
      <AddOrUpdateBookForm authors={authors} categories={categories} />
    </div>
  );
}
