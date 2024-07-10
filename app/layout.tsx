import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";

// const fontHeading = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-heading",
// });

// const fontBody = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-body",
// });

export const metadata: Metadata = {
  title: "Library Hub",
  description: "Generated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          // fontHeading.variable,
          // fontBody.variable
        )}
      >
        {children}
      </body>
      <Toaster richColors />
    </html>
  );
}
