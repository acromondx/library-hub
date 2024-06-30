import { BackButton } from "@/components/buttons";
import { DashboardHeader } from "../../_components/DashboardHeader";
import { AddOrUpdateBookForm } from "../../_components/AddOrUpdateBookForm";
import { getAllCategories } from "../../_actions/category";
import { getAllAuthors } from "../../_actions/author";

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
