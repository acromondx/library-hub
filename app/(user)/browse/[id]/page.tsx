import { getBookById, isBookAvailableForLoan } from "@/queries/user/book";
import { isBookmark } from "@/actions/user/bookmarks";
import { isLoanSubmitted } from "@/actions/user/loan";
import { getUser } from "@/queries/user/user";
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

  const isBookAvailableLoan = await isBookAvailableForLoan(params.id);
  const loanSubmitted = await isLoanSubmitted({
    userId: user,
    bookId: book.id,
  });
  return (
    <section>
      {/* <h1>{isBookAvailableLoan ? "yes" : "no"}</h1> */}
      <BackButton href="/books" />
      <BookDetailsSection
        book={book}
        userId={user}
        isBookmarkedByUser={isBookmarked}
        isLoanSubmitted={loanSubmitted}
        isBookAvailableLoan={isBookAvailableLoan}
      />
    </section>
  );
}
