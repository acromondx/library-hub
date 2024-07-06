"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function TabsNavigation() {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const tabs = [
    {
      title: "Books",
      href: "/admin/books",
      isActive: segment === null || segment === "new",
    },
    {
      title: "Categories",
      href: "/admin/books/categories/",
      isActive: segment === "categories",
    },
    {
      title: "Authors",
      href: "/admin/books/authors",
      isActive: segment === "authors",
    },
  ];

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="sticky top-0 z-30 w-full overflow-auto bg-background px-1"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="inline-flex items-center justify-center space-x-1.5 text-muted-foreground">
        {tabs.map((tab) => (
          <div
            role="none"
            key={tab.href}
            className={cn(
              "border-b-2 border-transparent py-1.5",
              tab.isActive && "border-primary",
            )}
          >
            <TabsTrigger
              value={tab.href}
              className={cn(
                "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                "hover:bg-muted hover:text-primary",
                tab.isActive && "text-primary",
              )}
            >
              {/* <span>
                <tab.icon className="mr-2 h-4 w-4" />
              </span> */}
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  );
}
