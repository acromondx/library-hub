"use server";
import db from "@/db/db";
import type { Book, Reservation } from "@prisma/client";

interface ReservedBook extends Book {
  reservation: {
    id: string;
    reservedAt: Date;
    expiresAt: Date;
  };
}

export async function reserveBook({
  bookId,
  userId,
}: {
  userId: string;
  bookId: string;
}): Promise<Reservation> {
  const book = await db.book.findUnique({
    where: { id: bookId },
    include: { loans: { where: { returnedAt: null } } },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.loans.length >= book.copies) {
    throw new Error("No copies available for reservation");
  }

  const existingReservation = await db.reservation.findFirst({
    where: {
      userId,
      bookId,
      expiresAt: { gt: new Date() },
    },
  });

  if (existingReservation) {
    throw new Error("You have already reserved this book");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 3);

  return db.reservation.create({
    data: {
      userId,
      bookId,
      expiresAt,
    },
  });
}

export async function getReservedBooks(
  userId: string,
): Promise<ReservedBook[]> {
  const reservations = await db.reservation.findMany({
    where: {
      userId,
      expiresAt: { gt: new Date() },
    },
    include: {
      book: true,
    },
  });

  return reservations.map((reservation) => ({
    ...reservation.book,
    reservation: {
      id: reservation.id,
      reservedAt: reservation.reservedAt,
      expiresAt: reservation.expiresAt,
    },
  }));
}

export async function cancelReservation(
  userId: string,
  reservationId: string,
): Promise<void> {
  const reservation = await db.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.userId !== userId) {
    throw new Error("You are not authorized to cancel this reservation");
  }

  await db.reservation.delete({
    where: { id: reservationId },
  });
}

export async function isBookReserved({
  userId,
  bookId,
}: {
  userId: string;
  bookId: string;
}): Promise<boolean> {
  const reservation = await db.reservation.findFirst({
    where: {
      userId,
      bookId,
      expiresAt: { gt: new Date() },
    },
  });

  return !!reservation;
}

export async function getBookReservations(
  bookId: string,
): Promise<Reservation[]> {
  return db.reservation.findMany({
    where: {
      bookId,
      expiresAt: { gt: new Date() },
    },
    orderBy: {
      reservedAt: "asc",
    },
  });
}

export async function extendReservation(
  userId: string,
  reservationId: string,
): Promise<Reservation> {
  const reservation = await db.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.userId !== userId) {
    throw new Error("You are not authorized to extend this reservation");
  }

  const newExpiresAt = new Date(reservation.expiresAt);
  newExpiresAt.setDate(newExpiresAt.getDate() + 3);

  return db.reservation.update({
    where: { id: reservationId },
    data: { expiresAt: newExpiresAt },
  });
}
