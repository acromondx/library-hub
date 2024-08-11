import "server-only";
import db from "@/db/db";

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      loans: true,
      requests: true,
      bookmarks: true,
    },
  });

  return user;
};

export async function getUser() {
  return "cly507n900000wcqhqfhp76j8";
}
