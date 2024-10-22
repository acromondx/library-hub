import { getAllAuthors } from "@/queries/admin/author";
import { getBookById } from "@/queries/admin/book";
import { getAllCategories } from "@/queries/admin/category";
import { BackButton } from "@/components/shared/buttons";
import Image from "next/image";
import { formatTextWithParagraphs } from "@/lib/utils/formatTextWithParagraphs";
interface ViewBookPageProps {
  params: {
    id: string;
  };
}

export default async function ViewBookPage({ params }: ViewBookPageProps) {
  const [book, categories, authors] = await Promise.all([
    getBookById({ id: params.id }),
    getAllCategories(),
    getAllAuthors(),
  ]);

  return (
    <div className="px-2">
      <BackButton href="/admin/books" />

      <div className="bg-background text-foreground">
        <section className="w-full pt-6 md:pt-8 lg:pt-12">
          <div className="container grid gap-10 md:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-center justify-center space-y-6">
              <Image
                src={book.pictureUrl}
                alt={book.title}
                width={450}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                  {book.title}
                </h1>
                <p className="text-lg font-medium text-muted-foreground">
                  by {book.author.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    ISBN
                  </p>
                  <p>{book.isbn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Publication Date
                  </p>
                  <p>May 2, 2017</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Category
                  </p>
                  <p>{book.category.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Copies Available
                  </p>
                  <p>{book.copies} in stock</p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Description</h2>

                {formatTextWithParagraphs(book.description)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
