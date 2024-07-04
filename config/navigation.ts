"use client";

import {
  LayoutDashboardIcon,
  LibraryBigIcon,
  LineChart,
  LucideIcon,
  Package,
  Users,
} from "lucide-react";

export interface SidebarNavigation {
  name: string;
  icon: LucideIcon;
  href: string;
}

export const adminSidebarNavigation: SidebarNavigation[] = [
  { name: "Overview", icon: LayoutDashboardIcon, href: "/admin/overview" },
  { name: "Books", icon: LibraryBigIcon, href: "/admin/books" },
  { name: "Requests", icon: Package, href: "/admin/requests" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Analytics", icon: LineChart, href: "/admin/analytics" },
];

export const userSidebarNavigation: SidebarNavigation[] = [
  { name: "Books", icon: LayoutDashboardIcon, href: "/books" },
  { name: "Reservations", icon: LibraryBigIcon, href: "/reservations" },
  { name: "Requests", icon: Package, href: "/requests" },
  { name: "Account", icon: LineChart, href: "/analytics" },
];
