import { getBookById, isBookAvailableForLoan } from "@/queries/user/book";
import { isBookmark } from "@/actions/user/bookmarks";
import { isLoanSubmitted } from "@/actions/user/loan";
import { BackButton } from "@/components/shared/buttons";
import BookDetailsSection from "@/components/user/Sections/BookDetailsSection";
import { getCurrentUser } from "@/actions/user/auth";

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const book = await getBookById(params.id);
  const userId = (await getCurrentUser()).id;
  const isBookmarked = await isBookmark({ userId: userId, bookId: book.id });

  const isBookAvailableLoan = await isBookAvailableForLoan(params.id);
  const loanSubmitted = await isLoanSubmitted({
    userId: userId,
    bookId: book.id,
  });
  return (
    <section>
      {/* <h1>{isBookAvailableLoan ? "yes" : "no"}</h1> */}
      <BackButton href="/books" />
      <BookDetailsSection
        book={book}
        userId={userId}
        isBookmarkedByUser={isBookmarked}
        isLoanSubmitted={loanSubmitted}
        isBookAvailableLoan={isBookAvailableLoan}
      />
    </section>
  );
}
