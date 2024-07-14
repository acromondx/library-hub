import type { UserRole } from "@prisma/client";
// biome-ignore lint/correctness/noUnusedImports: <Needed for nextauth type definition>
import NextAuth from "next-auth";
import type { User } from "next-auth";
// biome-ignore lint/correctness/noUnusedImports: <Needed for nextauth type definition>
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
