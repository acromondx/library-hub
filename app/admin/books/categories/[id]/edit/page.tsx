import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getCategoryById } from "@/actions/admin/category";
import { BackButton } from "@/components/shared/buttons";
import { AddOrUpdateCategoryForm } from "@/components/admin/Forms/AddOrUpdateCategoryForm";

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
