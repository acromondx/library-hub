import { AddOrUpdateCategoryForm } from "@/components/admin/Forms/AddOrUpdateCategoryForm";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { BackButton } from "@/components/shared/buttons";
import db from "@/db";

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
