import "server-only";
import db from "@/db";
import type { Bookmark, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/user/auth";

export async function getBookmarksByUser() {
  const userId = (await getCurrentUser()).id;
  const bookmarks = await db.bookmark.findMany({
    where: { userId },
    include: {
      book: {
        include: {
          author: true,
          category: true,
        },
      },
    },
  });

  return bookmarks.map((bookmark) => ({
    id: bookmark.id,
    bookId: bookmark.book.id,
    title: bookmark.book.title,
    pictureUrl: bookmark.book.pictureUrl,
    author: bookmark.book.author.name,
    category: bookmark.book.category.name,
  }));
}

export async function isBookmark({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}): Promise<boolean> {
  const bookmark = await db.bookmark.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
  return !!bookmark;
}

export async function getBookmarkCount({
  bookId,
}: {
  bookId: string;
}): Promise<number> {
  const count = await db.bookmark.count({
    where: { bookId },
  });
  return count;
}

export async function getUsersWhoBookmarked({
  bookId,
}: {
  bookId: string;
}): Promise<User[]> {
  const bookmarks = await db.bookmark.findMany({
    where: { bookId },
    include: { user: true },
  });
  return bookmarks.map((bookmark) => bookmark.user);
}
