import { TabsNavigation } from "@/components/shared/TabNav";
import type { ReactNode } from "react";

export default async function BooksLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full space-y-8 overflow-auto">
      <TabsNavigation />
      {children}
    </div>
    // <Shell variant="sidebar">

    // </Shell>
  );
}
