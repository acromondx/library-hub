import { BackButton } from "@/components/shared/buttons";
import db from "@/db/db";
import { AddOrUpdateAuthorForm } from "@/components/admin/Forms/AddOrUpdateAuthorForm";

export default async function Dashboard() {
  const categories = await db.author.findMany({ take: 3 });
  return (
    <div>
      <BackButton href="/admin/books/authors" ghost />
      {/* <DashboardHeader title="Add a author" showSeperator={false} /> */}
      <AddOrUpdateAuthorForm />
    </div>
  );
}
