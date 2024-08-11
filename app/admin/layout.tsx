import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { Sidebar } from "@/components/shared/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { adminSidebarNavigation } from "@/config/navigation";
import {
  MagnifyingGlass,
  UserCircle,
  UserCircleGear,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library Hub",
  description: "Generated",
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar type="ADMIN" />
      <div className="flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar type="ADMIN" />

          <div className="ml-auto">
            <Badge className="ml-auto rounded border-stone-600/[0.2] bg-stone-600/[0.1] text-xs font-normal uppercase text-stone-600 shadow-none">
              <UserCircleGear className="mr-1 h-4 w-4" />
              ADMIN
              <span className="sr-only">Toggle notifications</span>
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <UserCircle className="size-6" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="mx-auto p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
