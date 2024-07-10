"use server";

import db from "@/db/db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export async function getUser() {
  return "cly507n900000wcqhqfhp76j8";
}
