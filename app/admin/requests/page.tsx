import db from "@/db/db";

export default async function Dashboard() {
  const categories = await db.category.findMany({ take: 3 });
  return <p>{JSON.stringify(categories)}</p>;
}
