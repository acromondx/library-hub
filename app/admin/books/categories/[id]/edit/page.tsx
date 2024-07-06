import { DashboardHeader } from "@/app/admin/components/DashboardHeader";
import { getCategoryById } from "@/app/admin/actions/category";
import { BackButton } from "@/components/buttons";
import { AddOrUpdateCategoryForm } from "@/app/admin/components/AddOrUpdateCategoryForm";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const category = await getCategoryById({ id: params.id });

  return (
    <div className="px-2">
      <BackButton href="/admin/books" ghost />
      <DashboardHeader title="Add a category" showSeperator={false} />
      <AddOrUpdateCategoryForm category={category} />
    </div>
  );
}
