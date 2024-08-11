import "server-only";
import db from "@/db";
import { getCurrentUser } from "@/actions/user/auth";

export const getUserRequests = async () => {
  const userId = (await getCurrentUser()).id;
  const userRequests = db.request.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return userRequests;
};
