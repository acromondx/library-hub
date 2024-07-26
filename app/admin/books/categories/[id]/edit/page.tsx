import { getCategoryById } from "@/queries/admin/category";
import { AddOrUpdateCategoryForm } from "@/components/admin/Forms/AddOrUpdateCategoryForm";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { BackButton } from "@/components/shared/buttons";

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
