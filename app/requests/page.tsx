import db from "@/db/db";

export default async function Dashboard() {
  const categories = await db.category.findMany();
  return <p>{JSON.stringify(categories)}</p>;
}
