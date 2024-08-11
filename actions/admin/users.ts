"use server";

import db from "@/db";
import { hashPassword } from "@/lib/auth-utils";
import { Errors } from "@/lib/errors";
import {
  AddUserSchema,
  AddUserSchemaType,
  UpdateBookSchemaType,
  UpdateUserSchema,
  UpdateUserSchemaType,
} from "@/lib/schema/admin";
import { revalidatePath } from "next/cache";
import { sendEmail } from "../email";
import { sendEmailParams } from "@/types";

export const addUser = async (data: AddUserSchemaType) => {
  const { name, email, phoneNumber, image } = AddUserSchema.parse(data);
  if (!name || !email) {
    throw new Error("All fields are required");
  }

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error(Errors.itemAlreadyExists);
  }
  const tempPassword = crypto.randomUUID();

  const hashedPassword = await hashPassword(tempPassword);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      profilePicture: typeof data.image === "string" ? data.image : undefined,
    },
  });

  const emailData = {
    to_name: name,
    to_email: email,
    subject: "Welcome to the LibraryHub!",
    message: `Thanks for signing up for the LibraryHub. We're excited to have you on board!\n\n Your password is: ${tempPassword}`,
  };

  await sendEmail(emailData);
};

export async function updateUser(id: string, rawData: UpdateUserSchemaType) {
  const data = UpdateUserSchema.parse(rawData);

  console.log("zod ++++++++++");
  console.log(data);
  console.log("++++++++++");

  const user = await db.user.findUnique({ where: { id } });

  const updateData: any = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    profilePicture: data.image as string,
  };

  console.log("prisma ++++++++++");
  console.log(updateData);

  await db.user.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/users");
}

export async function deleteUserById(id: string) {
  await db.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}

export async function getAllUsers() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "asc" },
  });
  return users;
}
