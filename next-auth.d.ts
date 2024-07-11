/* eslint-disable unused-imports/no-unused-imports */
// ⚠️⚠️ Don't remove this eslint-disable above

import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = User & {
  role: UserRole;
};

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
