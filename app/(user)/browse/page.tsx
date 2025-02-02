import { getAllBooks } from "@/queries/user/actions";
import AllBooksSection from "@/components/user/Sections/AllBooksSection";

export default async function NewProductPage() {
  const books = await getAllBooks();
  return <AllBooksSection books={books} />;
}
