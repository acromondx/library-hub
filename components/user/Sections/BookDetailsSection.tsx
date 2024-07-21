"use client";
import type { BookType } from "@/actions/user/book";
import { toggleBookmark } from "@/actions/user/bookmarks";
import { createLoan } from "@/actions/user/loan";
import { reserveBook } from "@/actions/user/reservation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookmarkCheckIcon, BookmarkPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookDetailsSection({
  book,
  userId,
  isBookmarkedByUser,
  isReservedByUser,
  isLoanSubmitted,
  isBookAvailableLoan,
}: {
  book: BookType;
  userId: string;
  isBookmarkedByUser: boolean;
  isReservedByUser: boolean;
  isLoanSubmitted: boolean;
  isBookAvailableLoan: boolean;
}) {
  const router = useRouter();

  const handleReserveBook = async (bookId: string) => {
    if (isBookAvailableLoan) {
      await createLoan({ userId: userId, bookId: book.id });
    } else {
      await reserveBook({
        userId: userId,
        bookId: bookId,
      });
    }

    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div>
          <img
            src={book.pictureUrl}
            width={400}
            height={600}
            alt="Book Cover"
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Category
              </p>
              <p>{book.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Publication Date
              </p>
              <p>{book.publicationDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ISBN</p>
              <p>{book.isbn}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Available Copies
              </p>
              <p>12</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p>{book.description}</p>
          </div>
          <div className="flex gap-4">
            {!isLoanSubmitted ? (
              <Button
                disabled={isReservedByUser}
                size="lg"
                onClick={() => handleReserveBook(book.id)}
              >
                {!isBookAvailableLoan &&
                  (isReservedByUser ? "Reserved" : "Reserve Book")}
                {isBookAvailableLoan && "Get book"}
              </Button>
            ) : (
              <Button disabled size="lg">
                Loan Submitted
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              onClick={async () => {
                await toggleBookmark({ bookId: book.id, userId: userId });
              }}
            >
              {isBookmarkedByUser ? (
                <BookmarkCheckIcon className="mr-2 h-5 w-5" />
              ) : (
                <BookmarkPlus className="mr-2 h-5 w-5" />
              )}
              {isBookmarkedByUser ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
          {isLoanSubmitted && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>You've submitted a loan this book </AlertTitle>
              <AlertDescription>
                Please wait while we process your submission{" "}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
