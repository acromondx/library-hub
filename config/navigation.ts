'use client'
import { Icon } from "@phosphor-icons/react/dist/lib/types";
import { Bookmarks,Books,Compass,GitPullRequest  , Sparkle ,SquaresFour , Stack ,TrendUp,User  ,UsersThree ,} from "@phosphor-icons/react/dist/ssr";


export interface SidebarNavigation {
  name: string;
  icon: Icon;
  href: string;
}

export const adminSidebarNavigation: SidebarNavigation[] = [
  { name: "Overview", icon: SquaresFour , href: "/admin/overview" },
  { name: "Books", icon: Books, href: "/admin/books" },
  { name: "Requests", icon: GitPullRequest , href: "/admin/requests" },
  { name: "Users", icon: UsersThree , href: "/admin/users" },
  { name: "Analytics", icon: TrendUp , href: "/admin/analytics" },
];

export const userSidebarNavigation: SidebarNavigation[] = [
  { name: "Browse", icon: Compass , href: "/books" },
  { name: "Reservations", icon: Stack , href: "/reservations" },
  { name: "Loans", icon: Sparkle , href: "/loans" },
  { name: "Requests", icon: GitPullRequest , href: "/requests" },
  { name: "Bookmarks", icon: Bookmarks , href: "/bookmarks" },
  { name: "Account", icon: User , href: "/account" },
];
