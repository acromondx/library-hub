import { getAllBooks } from "../actions/actions";
import AllBooksSection from "../components/Sections/AllBooksSection";

export default async function NewProductPage() {
  const books = await getAllBooks();
  return <AllBooksSection books={books} />;
}
