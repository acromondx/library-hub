"use client";
import { Button } from "@/components/ui/button";
import { BookmarkCheckIcon, BookmarkPlus } from "lucide-react";
import { BookType } from "@/actions/user/book";
import { toggleBookmark } from "@/actions/user/bookmarks";
import { getUser } from "@/actions/user/user";
import { reserveBook } from "@/actions/user/reservation";
import { useRouter } from "next/navigation";

export default function BookDetailsSection({
  book,

  userId,
  isBookmarkedByUser,
  isReservedByUser,
}: {
  book: BookType;
  userId: string;
  isBookmarkedByUser: boolean;
  isReservedByUser: boolean;
}) {
  const router = useRouter();

  const handleReserveBook = async (bookId: string) => {
    await reserveBook({
      userId: userId,
      bookId: bookId,
    });

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
            <Button
              disabled={isReservedByUser}
              size="lg"
              onClick={() => handleReserveBook(book.id)}
            >
              {isReservedByUser ? "Reserved" : "Reserve Book"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={async () => {
                const user = await getUser();
                await toggleBookmark({ bookId: book.id, userId: user });
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
        </div>
      </div>
    </div>
  );
}
