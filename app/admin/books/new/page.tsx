import { BackButton } from "@/components/shared/buttons";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { AddOrUpdateBookForm } from "@/components/admin/Forms/AddOrUpdateBookForm";
import { getAllCategories } from "@/actions/admin/category";
import { getAllAuthors } from "@/actions/admin/author";

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
