import "server-only";
import db from "@/db/db";
import { getUser } from "./user";

export const getUserRequests = async () => {
  const user = await getUser();
  const userRequests = db.request.findMany({
    where: { userId: user },
    orderBy: { createdAt: "desc" },
  });
  return userRequests;
};
