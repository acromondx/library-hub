"use client";
import {
  cancelReservation,
  type ReservedBook,
} from "@/actions/user/reservation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prettifyDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ReservedBooksTable({
  userId,
  reservedBooks,
}: { userId: string; reservedBooks: ReservedBook[] }) {

    const router = useRouter();
  const handleRemoveFromReservedBooks = async (reservationId: string) => {
    try {
      await cancelReservation({ userId: userId, reservationId: reservationId });
   router.refresh()
    } catch (error) {}
  };

  return (
    <Table>
      <TableCaption>Your recent reservations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Cover</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Expires at</TableHead>

          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservedBooks.map((reservedBook) => (
          <TableRow key={reservedBook.id}>
            <TableCell className="font-medium">
              {prettifyDate(reservedBook.reservation.reservedAt)}
            </TableCell>
            <TableCell>
              <img src={reservedBook.pictureUrl} className="h-10 w-7" alt="" />
            </TableCell>

            <TableCell>{reservedBook.title}</TableCell>
            <TableCell className="font-medium">
              {prettifyDate(reservedBook.reservation.expiresAt)}
            </TableCell>

            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="text-destructive" onClick={()=>handleRemoveFromReservedBooks(reservedBook.reservation.id)}>
                {" "}
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
