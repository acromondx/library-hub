import db from "@/db/db";
import { Book, Bookmark, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addBookmark(
  userId: string,
  bookId: string,
): Promise<Bookmark> {
  try {
    const bookmark = await db.bookmark.create({
      data: {
        userId,
        bookId,
      },
    });
    return bookmark;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("This book is already in bookmarks");
    }
    throw error;
  }
}

export async function removeBookmark(
  userId: string,
  bookId: string,
): Promise<void> {
  await db.bookmark.delete({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
}

export async function getBookmarks(userId: string): Promise<Book[]> {
  const bookmarks = await db.bookmark.findMany({
    where: { userId },
    include: { book: true },
  });
  return bookmarks.map((bookmark) => bookmark.book);
}

export async function isBookmark(
  userId: string,
  bookId: string,
): Promise<boolean> {
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

export async function getBookmarkCount(bookId: string): Promise<number> {
  const count = await db.bookmark.count({
    where: { bookId },
  });
  return count;
}

export async function getUsersWhoBookmarked(bookId: string): Promise<User[]> {
  const bookmarks = await db.bookmark.findMany({
    where: { bookId },
    include: { user: true },
  });
  return bookmarks.map((bookmark) => bookmark.user);
}

export async function toggleBookmark(
  userId: string,
  bookId: string,
): Promise<boolean> {
  const bookmark = await isBookmark(userId, bookId);
  if (bookmark) {
    await removeBookmark(userId, bookId);
    return false;
  } else {
    await addBookmark(userId, bookId);
    return true;
  }
}
