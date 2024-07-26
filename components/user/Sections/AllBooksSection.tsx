"use client";

import { Input } from "@/components/ui/input";
import { type ChangeEvent, useMemo, useState } from "react";
import Image from "next/image";
import type { IBook as Book } from "@/actions/user/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Filters {
  category: string[];
  author: string[];
  publicationDate: string[];
}

export default function AllBooksSection({ books }: { books: Book[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof Book>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    author: [],
    publicationDate: [],
  });

  const filteredBooks = useMemo((): Book[] => {
    let result = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (filters.category.length > 0) {
      result = result.filter((book) =>
        filters.category.includes(book.category.toLowerCase()),
      );
    }
    if (filters.author.length > 0) {
      result = result.filter((book) =>
        filters.author.includes(book.author.toLowerCase()),
      );
    }
    if (filters.publicationDate.length > 0) {
      result = result.filter((book) =>
        filters.publicationDate.includes(book.publicationDate),
      );
    }

    result = result.sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
      return 0;
    });

    return result;
  }, [searchTerm, books, sortBy, sortOrder, filters]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: keyof Book): void => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleFilter = (type: keyof Filters, value: string): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value.toLowerCase())
        ? prevFilters[type].filter((item) => item !== value.toLowerCase())
        : [...prevFilters[type], value.toLowerCase()],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Book Catalog</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md"
          />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
                <DropdownMenuRadioItem value="title">
                  Title
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="author">
                  Author
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="category">
                  Category
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="publicationDate">
                  Publication Date
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
      <div className="mb-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/browse/${book.id}`}>
            <div className="rounded-lg bg-background p-4 shadow">
              <Image
                src={book.pictureUrl}
                alt={book.title}
                width={200}
                height={300}
                className="mx-auto mb-4 h-[300px] w-[200px] rounded-lg object-cover"
              />
              {/* <Button asChild variant="outline" className="w-full">
              <Link href={`/books/${book.id}`}>View Details</Link>
            </Button> */}
              <h3 className="mb-2 text-lg font-bold">{book.title}</h3>
              <p className="mb-2 text-muted-foreground">{book.author}</p>
              <p className="mb-4 text-muted-foreground">
                {book.availableCopies} copies available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
