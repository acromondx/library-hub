import { BackButton } from "@/components/shared/buttons";
import { getBookById } from "@/actions/user/book";
import BookDetailsSection from "@/components/user/Sections/BookDetailsSection";
import { isBookmark } from "@/actions/user/bookmarks";
import { getUser } from "@/actions/user/user";
import { isBookReserved } from "@/actions/user/reservation";

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
