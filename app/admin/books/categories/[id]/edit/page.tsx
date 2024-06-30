import { DashboardHeader } from "@/app/admin/_components/DashboardHeader";
import { getCategoryById } from "@/app/admin/_actions/category";
import { BackButton } from "@/components/buttons";
import { AddOrUpdateCategoryForm } from "@/app/admin/_components/AddOrUpdateCategoryForm";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const category = await getCategoryById({ id: Number(params.id) });

  return (
    <div className="px-2">
      <BackButton href="/admin/books" ghost />
      <DashboardHeader title="Add a category" showSeperator={false} />
      <AddOrUpdateCategoryForm category={category} />
    </div>
  );
}
