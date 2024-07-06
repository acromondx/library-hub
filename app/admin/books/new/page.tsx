import { BackButton } from "@/components/buttons";
import { DashboardHeader } from "../../components/DashboardHeader";
import { AddOrUpdateBookForm } from "../../components/AddOrUpdateBookForm";
import { getAllCategories } from "../../actions/category";
import { getAllAuthors } from "../../actions/author";

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
