"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { removeBookmark } from "@/actions/user/bookmarks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BookmarkPageProps {
  id: string;
  bookId: string;
  title: string;
  author: string;
  category: string;
  pictureUrl: string;
}

export default function BookmarksSection({
  userId,
  userBookmarks,
}: {
  userId: string;
  userBookmarks: BookmarkPageProps[];
}) {
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState(userBookmarks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [bookmarks, searchTerm]);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBookmarks = filteredBookmarks.slice(
    indexOfFirstBook,
    indexOfLastBook,
  );
  const totalPages = Math.ceil(filteredBookmarks.length / booksPerPage);

  const handleRemoveBookmark = async (id: string, bookId: string) => {
    try {
      await removeBookmark({
        userId: userId,
        bookId: bookId,
      });
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== id),
      );
    } catch (error) {
      toast.error("Failed");
    }
    router.refresh();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Bookmarks</h1>
        <Input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentBookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={bookmark.pictureUrl}
              alt={bookmark.title}
              width={300}
              height={400}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold">{bookmark.title}</h3>
              <p className="mb-4 text-gray-500">{bookmark.author}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  handleRemoveBookmark(bookmark.id, bookmark.bookId)
                }
              >
                Remove Bookmark
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                // disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                // disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
