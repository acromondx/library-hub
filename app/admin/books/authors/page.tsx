import db from "@/db/db";

export default async function Dashboard() {
  const categories = await db.category.findMany({ take: 3 });
  return (
    <div className="bg-yellow-400">
      <p>{JSON.stringify(categories)}</p>
    </div>
  );
}
