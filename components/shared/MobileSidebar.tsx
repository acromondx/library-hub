"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  userSidebarNavigation,
  adminSidebarNavigation,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import { BookMarkedIcon, Library, Menu } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function MobileSidebar({ type }: { type: "USER" | "ADMIN" }) {
  const segment = useSelectedLayoutSegment();
  let sidebarNavigation;
  if (type === "USER") {
    sidebarNavigation = userSidebarNavigation;
  } else {
    sidebarNavigation = adminSidebarNavigation;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link href="/" className="mb-4 flex items-center gap-2 font-semibold">
            <div className="rounded-md bg-primary p-2 text-white">
              {" "}
              <BookMarkedIcon className="size-3" />
            </div>{" "}
            <span className="">LibraryHub</span>
          </Link>

          {sidebarNavigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.href.includes(String(segment));
            return (
              <Link
                aria-label={item.name}
                key={index}
                href={item.href}
                className={cn(
                  isActive
                    ? "flex items-center gap-3 rounded-lg bg-primary/[0.2] px-3 py-2 text-primary transition-all hover:text-primary"
                    : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}
