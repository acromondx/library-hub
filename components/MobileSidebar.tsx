"use client";
import Link from "next/link";
import { Library, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSelectedLayoutSegment } from "next/navigation";
import { SidebarNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileSidebar({
  sidebarNavigation,
}: {
  sidebarNavigation: SidebarNavigation[];
}) {
  const segment = useSelectedLayoutSegment();

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
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Library className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {sidebarNavigation.map((item, index) => {
            const Icon = item.icon;
            let isActive = item.href.includes(String(segment));
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
