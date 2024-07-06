import { DashboardHeader } from "@/app/admin/components/DashboardHeader";
import { BackButton } from "@/components/buttons";
import { AddOrUpdateAuthorForm } from "@/app/admin/components/AddOrUpdateAuthorForm";
import { getAuthorById } from "@/app/admin/actions/author";
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
