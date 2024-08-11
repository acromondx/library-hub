import "server-only";
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

export async function getAllRequests() {
  const requests = await db.request.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return requests.map((request) => {
    return {
      id: request.id,
      userId: request.userId,
      userName: request.user.name,
      userPicture: request.user.picture,
      type: request.type,
      description: request.description,
      status: request.status,
      createdAt: request.createdAt,
    } as IRequest;
  });
}
