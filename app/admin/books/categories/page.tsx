import { getAllCategories } from "@/actions/admin/category";
import { CategoryOrAuthorCard } from "@/components/admin/CategoryOrAuthorCard";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { LinkButton } from "@/components/shared/buttons";
import { PlusCircleIcon } from "lucide-react";

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <>
      <DashboardHeader title="Categories">
        <LinkButton
          title="Add a category"
          href="/admin/books/categories/new"
          icon={PlusCircleIcon}
        />
      </DashboardHeader>

      <div className="grid grid-cols-1 gap-6 pb-8 pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryOrAuthorCard
              key={category.id}
              item={category}
              type="category"
              books={category.books.length}
            />
          ))
        ) : (
          <p>Category is empty</p>
        )}
      </div>
    </>
  );
}
