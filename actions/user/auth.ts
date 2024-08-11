"use server";

import db from "@/db";
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from "@/lib/auth-utils";
import { Errors } from "@/lib/errors";
import {
  ChangePasswordSchemaType,
  SignInSchemaType,
  changePasswordSchema,
  signInSchema,
} from "@/lib/schema/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function changePassword({
  data,
}: {
  data: ChangePasswordSchemaType;
}) {
  const { oldPassword, newPassword } = changePasswordSchema.parse(data);

  const sessionUser = await getCurrentUser();
  console.log("Session User: ", sessionUser);

  const user = await db.user.findFirst({
    where: {
      email: sessionUser.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("User found: ", user.email);
  console.log("Old Password (Input): ", oldPassword);
  console.log("Stored Hashed Password: ", user.password);

  const isPasswordCorrect = await comparePassword(oldPassword, user.password);
  console.log("Password Comparison Result: ", isPasswordCorrect);

  if (!isPasswordCorrect) {
    console.error("Password comparison failed.");
    throw new Error("Old password is incorrect");
  }

  console.log("Password comparison succeeded.");

  const hashedPassword = await hashPassword(newPassword);

  if (!user.hasChangedDefaultPassword) {
    await db.user.update({
      where: {
        email: sessionUser.email,
      },
      data: {
        hasChangedDefaultPassword: true,
      },
    });
  }

  await db.user.update({
    where: {
      email: sessionUser.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  await logOut();
  redirect("/auth/sign-in");
}

export const signIn = async ({ data }: { data: SignInSchemaType }) => {
  const { email, password } = signInSchema.parse(data);
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  console.log(email, password);
  const account = await db.user.findUnique({ where: { email } });

  if (!account || !(await comparePassword(password, account.password))) {
    throw new Error(Errors.invalidCredentials);
  }

  const token = await generateToken(account.id, "USER");

  cookies().set("AUTH_TOKEN", token, {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  if (!account.hasChangedDefaultPassword) {
    throw new Error(Errors.changeYourPassword);
  }

  return { message: "Signed in successfully", token };
};

export async function logOut() {
  cookies().delete("AUTH_TOKEN");
  redirect("/auth/sign-in");
}

export const getCurrentUser = cache(async function () {
  const cookieStore = cookies();
  const token = cookieStore.get("AUTH_TOKEN");

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const decoded = await verifyToken(token.value);
    console.log(`Decoded Token: ${JSON.stringify(decoded)}`);

    const account = await db.user.findFirst({
      where: { id: decoded.userId },
      include: {
        loans: true,
        requests: true,
        bookmarks: true,
      },
    });

    if (!account) {
      cookieStore.delete("AUTH_TOKEN");
      redirect("/auth/sign-in");
    }

    return {
      id: account.id,
      name: account.name,
      email: account.email,
      hasChangedDefaultPassword: account.hasChangedDefaultPassword,
      profilePicture: account.profilePicture as string,
      phoneNumber: account.phoneNumber,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      bookmarks: account.bookmarks,
      loans: account.loans,
      requests: account.requests,
    };
  } catch (error) {
    cookieStore.delete("AUTH_TOKEN");
    redirect("/auth/sign-in");
  }
});
