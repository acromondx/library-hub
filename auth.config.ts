import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

// import { env } from "@/env.mjs";

export default {
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "Next Template App <onboarding@resend.dev>",
    }),
  ],
} satisfies NextAuthConfig;
