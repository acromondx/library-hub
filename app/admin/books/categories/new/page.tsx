import { BackButton } from "@/components/buttons";
import db from "@/db/db";
import { AddOrUpdateCategoryForm } from "@/app/admin/_components/AddOrUpdateCategoryForm";
import { DashboardHeader } from "@/app/admin/_components/DashboardHeader";

export default async function Dashboard() {
  const categories = await db.category.findMany({ take: 3 });
  return (
    <div>
      <BackButton href="/admin/books" ghost />
      <DashboardHeader title="Add a category" showSeperator={false} />
      <AddOrUpdateCategoryForm />
    </div>
  );
}
