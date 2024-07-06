import { TabsNavigation } from "@/app/admin/components/TabNav";
import { ReactNode } from "react";

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
