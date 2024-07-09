"use server";
import db from "@/db/db";
import { Bookmark, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export async function addBookmark({
  userId,
  bookId,
}: {
  bookId: string;
  userId: string;
}): Promise<Bookmark> {
  try {
    const bookmark = await db.bookmark.create({
      data: {
        userId,
        bookId,
      },
    });
    console.log("++++ Bookmark created");
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

export async function removeBookmark({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}): Promise<void> {
  await db.bookmark.delete({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
  revalidatePath(`/bookmarks`);
}

export async function getBookmarksByUser({ userId }: { userId: string }) {
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

export async function toggleBookmark({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}): Promise<boolean> {
  const bookmark = await isBookmark({ userId: userId, bookId: bookId });
  if (bookmark) {
    await removeBookmark({ userId: userId, bookId: bookId });
    revalidatePath(`/books/${bookId}`);
    return false;
  } else {
    await addBookmark({ bookId: bookId, userId: userId });
    revalidatePath(`/books/${bookId}`);

    return true;
  }
}