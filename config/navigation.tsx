import {
  Bookmarks,
  Books,
  Compass,
  GitPullRequest,
  Sparkle,
  SquaresFour,
  TrendUp,
  User,
  UsersThree,
} from "@phosphor-icons/react";

export const adminSidebarNavigation = [
  { name: "Overview", icon: SquaresFour, href: "/admin/overview" },
  { name: "Books", icon: Books, href: "/admin/books" },
  { name: "Loans", icon: Sparkle, href: "/admin/loans" },
  { name: "Requests", icon: GitPullRequest, href: "/admin/requests" },
  { name: "Users", icon: UsersThree, href: "/admin/users" },
  { name: "Analytics", icon: TrendUp, href: "/admin/analytics" },
];

export const userSidebarNavigation = [
  { name: "Browse", icon: Compass, href: "/browse" },
  // { name: "Reservations", icon: Stack , href: "/reservations" },
  { name: "Loans", icon: Sparkle, href: "/loans" },
  { name: "Requests", icon: GitPullRequest, href: "/requests" },
  { name: "Bookmarks", icon: Bookmarks, href: "/bookmarks" },
  { name: "Account", icon: User, href: "/account" },
];
