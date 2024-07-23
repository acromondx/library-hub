import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// const fontHeading = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-heading",
// });

// const fontBody = GeistSans({
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
      <TooltipProvider> <body
        className={cn("antialiased", GeistSans.className)}
      >
        {children}
      </body>
      </TooltipProvider>
     
      <Toaster richColors />
    </html>
  );
}
