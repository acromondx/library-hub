import "server-only";
import db from "@/db";
import { getUser } from "./user";
import { getUserFromSession } from "@/actions/user/auth";

export const getUserRequests = async () => {
  const userId = (await getUserFromSession()).id;
  const userRequests = db.request.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return userRequests;
};
