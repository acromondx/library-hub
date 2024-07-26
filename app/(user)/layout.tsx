import { MobileSidebar } from "@/components/shared/MobileSidebar";
import { Sidebar } from "@/components/shared/Sidebar";
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
import { userSidebarNavigation } from "@/config/navigation";
// import { CircleUser, Search } from "lucide-react";
import { MagnifyingGlass, UserCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library Hub",
  description: "Generated",
};

export const dynamic = "force-dynamic";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar type="USER" />
      <div className="flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar type="USER" />
          <div className="flex-1">
            <form>
              <div className="relative">
                <MagnifyingGlass className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserCircle className="size-5" />
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
        </header>
        <main className="flex-1 overflow-auto">
          <div className="mx-auto p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
