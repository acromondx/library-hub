import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Author, Category } from "@prisma/client";
import { BookOpenTextIcon } from "lucide-react";
import Link from "next/dist/client/link";
import { CardActions } from "./Sections/CardActions";

export function CategoryOrAuthorCard({
  item,
  books,
  type,
}: {
  item: Category | Author;
  books: number;
  type: "category" | "author";
}) {
  return (
    <Card>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <CardActions item={item} type={type} />
        </div>
        <div className="flex justify-between">
          <Button asChild variant="outline" size="sm">
            <Link
              href={`/admin/categories/books/${item.id}`}
              className="flex flex-row justify-center gap-2"
            >
              <BookOpenTextIcon className="h-4 w-4 text-primary" />
              <p>{books} books</p>
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
