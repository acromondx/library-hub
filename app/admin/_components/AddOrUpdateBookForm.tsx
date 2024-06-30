/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { Author, Book, Category } from "@prisma/client";
import { addBook, updateBook } from "../_actions/book";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function AddOrUpdateBookForm({
  book,
  authors,
  categories,
}: {
  book?: Book | null;
  authors: Author[];
  categories: Category[];
}) {
  const [error, action] = useFormState(
    book == null ? addBook : updateBook.bind(null, book.id),
    {},
  );

  const [currentSelectedImage, setCurrentSelectedImage] = useState<File | null>(
    null,
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (currentSelectedImage) {
      const imageUrl = URL.createObjectURL(currentSelectedImage);
      setImagePreviewUrl(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    } else if (book?.pictureUrl) {
      setImagePreviewUrl(book.pictureUrl);
    }
  }, [currentSelectedImage, book?.pictureUrl]);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label htmlFor="title">Name</Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={book?.title || ""}
          />
          {error.title && <div className="text-destructive">{error.title}</div>}
        </div>

        <div className="space-y-3">
          {" "}
          <Label htmlFor="description">Description</Label>
          <Textarea
            // type="text"
            id="description"
            name="description"
            maxLength={680}
            required
            defaultValue={book?.description || ""}
          />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            type="text"
            id="isbn"
            name="isbn"
            required
            defaultValue={book?.isbn || ""}
          />
          {error.isbn && <div className="text-destructive">{error.isbn}</div>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="copies">Copies</Label>
          <Input
            type="number"
            id="copies"
            name="copies"
            required
            defaultValue={book?.copies || ""}
          />
          {error.copies && (
            <div className="text-destructive">{error.copies}</div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="publishedAt">Publication Date</Label>
          <Input
            type="date"
            id="publishedAt"
            name="publishedAt"
            required
            defaultValue={
              book?.publishedAt
                ? new Date(book.publishedAt).toISOString().slice(0, 10)
                : ""
            }
          />
          {error.publishedAt && (
            <div className="text-destructive">{error.publishedAt}</div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="image">Cover image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            required={book == null}
            onChange={handleFileChange}
          />
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
      </div>
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} height={180} width={180} alt="" />
      ) : (
        <img src={book?.pictureUrl} height={180} width={180} alt="" />
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
