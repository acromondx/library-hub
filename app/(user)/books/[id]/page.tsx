import { getBookById } from "@/actions/user/book";
import { isBookmark } from "@/actions/user/bookmarks";
import { isBookReserved } from "@/actions/user/reservation";
import { getUser } from "@/actions/user/user";
import { BackButton } from "@/components/shared/buttons";
import BookDetailsSection from "@/components/user/Sections/BookDetailsSection";

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const book = await getBookById(params.id);
  const user = await getUser();
  const isBookmarked = await isBookmark({ userId: user, bookId: book.id });
  const isReservedByUser = await isBookReserved({
    userId: user,
    bookId: book.id,
  });
  return (
    <section>
      <BackButton href="/books" />
      <BookDetailsSection
        book={book}
        userId={user}
        isBookmarkedByUser={isBookmarked}
        isReservedByUser={isReservedByUser}
      />
    </section>
  );
}
