import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeftIcon, LucideIcon } from "lucide-react";

export function BackButton({
  href,
  text,
  ghost,
}: {
  href: string;
  text?: string;
  ghost?: boolean;
}) {
  return (
    <Link href={href}>
      <Button className="mb-4" variant={ghost ? "ghost" : "outline"} size="sm">
        <ArrowLeftIcon className="mr-2 h-3 w-3 text-primary" />
        {text ?? "Back"}
      </Button>
    </Link>
  );
}

export function LinkButton({
  title,
  icon: Icon,
  href,
}: {
  title: string;
  icon?: LucideIcon;
  href: string;
}) {
  return (
    <Button asChild variant="default" className="ml-auto" size="sm">
      <Link href={href}>
        {Icon && <Icon className="mr-2 h-4 w-4" />} {title}
      </Link>
    </Button>
  );
}
