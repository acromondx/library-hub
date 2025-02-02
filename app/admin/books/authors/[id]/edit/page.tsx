import { getAuthorById } from "@/queries/admin/author";
import { AddOrUpdateAuthorForm } from "@/components/admin/Forms/AddOrUpdateAuthorForm";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { BackButton } from "@/components/shared/buttons";
import { notFound } from "next/navigation";

interface EditAuthorPageProps {
  params: {
    id: string;
  };
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const author = await getAuthorById({ id: params.id });

  if (!author) {
    return notFound();
  }

  return (
    <div className="px-2">
      <BackButton href="/admin/books/authors" ghost />
      <DashboardHeader title="Add a author" showSeperator={false} />
      <AddOrUpdateAuthorForm author={author} />
    </div>
  );
}
