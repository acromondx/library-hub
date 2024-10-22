"use server";
import db from "@/db";
import { RequestStatus, RequestType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface IRequest {
  id: string;

  userId: string;
  type: RequestType;
  description: string;
  status: RequestStatus;
  createdAt: Date;
  userName: string;
  userPicture: string;
}

export async function approveRequest({ id }: { id: string }) {
  try {
    const request = await db.request.findUnique({
      where: { id },
    });

    if (request) {
      const newStatus =
        request.type === "BOOK_SUGGESTION" ? "APPROVED" : "ADDRESSED";
      await db.request.update({
        where: { id },
        data: {
          status: newStatus,
        },
      });
    }

    revalidatePath("/admin/requests");
  } catch (error) {
    console.error("Error approving request:", error);
  }
}

export async function declineRequest({ id }: { id: string }) {
  try {
    const request = await db.request.findUnique({
      where: { id },
    });

    if (request) {
      await db.request.update({
        where: { id },
        data: {
          status: "DECLINED",
        },
      });
    }

    revalidatePath("/admin/requests");
  } catch (error) {
    console.error("Error declining request:", error);
  }
}
