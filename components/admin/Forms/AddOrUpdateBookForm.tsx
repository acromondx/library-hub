/* eslint-disable @next/next/no-img-element */
"use client";

import { addBook, updateBook } from "@/actions/admin/book";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AddBookSchema,
  type AddBookSchemaType,
  UpdateBookSchema,
  type UpdateBookSchemaType,
} from "@/lib/schema/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Author, Book, Category } from "@prisma/client";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function AddOrUpdateBookForm({
  book,
  authors,
  categories,
}: {
  book?: Book | null;
  authors: Author[];
  categories: Category[];
}) {
  const router = useRouter();
  const schema = book ? UpdateBookSchema : AddBookSchema;

  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      title: book?.title,
      description: book?.description,
      copies: book?.copies,
      isbn: book?.isbn,
      publishedAt: book?.publishedAt ? new Date(book.publishedAt) : undefined,
      authorId: book?.authorId,
      categoryId: book?.categoryId,
    },
  });
  const isLoading = form.formState.isLoading;

  const [currentSelectedImage, setCurrentSelectedImage] = useState<File | null>(
    null,
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCurrentSelectedImage(file);
      form.setValue("image", file, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (currentSelectedImage) {
      const imageUrl = URL.createObjectURL(currentSelectedImage);
      setImagePreviewUrl(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
    if (book?.pictureUrl) {
      setImagePreviewUrl(book.pictureUrl);
    }
  }, [currentSelectedImage, book?.pictureUrl]);

  async function onSubmit(data: AddBookSchemaType | UpdateBookSchemaType) {
    try {
      console.log(data);

      if (book) {
        await updateBook(book.id, data as UpdateBookSchemaType);
        toast.success("Book updated.");
      } else {
        await addBook(data as AddBookSchemaType);
        toast.success("Book added.");
      }

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4 space-y-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book title</FormLabel>
              <FormControl>
                <Input placeholder="Book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  maxLength={680}
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="ISBN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Copies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id.toString()}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book cover</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e.target.files?.[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" disabled={isLoading} type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>

        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} height={180} width={180} alt="" />
        ) : (
          <img src={book?.pictureUrl} height={180} width={180} alt="" />
        )}
      </form>
    </Form>
  );
}

// export function AddOrUpdateBookForm({
//   book,
//   authors,
//   categories,
// }: {
//   book?: Book | null;
//   authors: Author[];
//   categories: Category[];
// }) {
//   const [error, action] = useFormState(
//     book == null ? addBook : updateBook.bind(null, book.id),
//     {},
//   );

// const [currentSelectedImage, setCurrentSelectedImage] = useState<File | null>(
//   null,
// );
// const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

// const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files && e.target.files.length > 0) {
//     setCurrentSelectedImage(e.target.files[0]);
//   }
// };

// useEffect(() => {
//   if (currentSelectedImage) {
//     const imageUrl = URL.createObjectURL(currentSelectedImage);
//     setImagePreviewUrl(imageUrl);

//     return () => URL.revokeObjectURL(imageUrl);
//   } else if (book?.pictureUrl) {
//     setImagePreviewUrl(book.pictureUrl);
//   }
// }, [currentSelectedImage, book?.pictureUrl]);

//   return (
//     <form action={action} className="space-y-8">
//       <div className="space-y-4">
//         <div className="space-y-3">
//           <Label htmlFor="title">Name</Label>
//           <Input
//             type="text"
//             id="title"
//             name="title"
//             required
//             defaultValue={book?.title || ""}
//           />
//           {error.title && <div className="text-destructive">{error.title}</div>}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             // type="text"
//             id="description"
//             name="description"
//             maxLength={680}
//             required
//             defaultValue={book?.description || ""}
//           />
//           {error.description && (
//             <div className="text-destructive">{error.description}</div>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="isbn">ISBN</Label>
//           <Input
//             type="text"
//             id="isbn"
//             name="isbn"
//             required
//             defaultValue={book?.isbn || ""}
//           />
//           {error.isbn && <div className="text-destructive">{error.isbn}</div>}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="copies">Copies</Label>
//           <Input
//             type="number"
//             id="copies"
//             name="copies"
//             required
//             defaultValue={book?.copies || ""}
//           />
//           {error.copies && (
//             <div className="text-destructive">{error.copies}</div>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="publishedAt">Publication Date</Label>
//           <Input
//             type="date"
//             id="publishedAt"
//             name="publishedAt"
//             required
// defaultValue={
//   book?.publishedAt
//     ? new Date(book.publishedAt).toISOString().slice(0, 10)
//     : ""
// }
//           />
//           {error.publishedAt && (
//             <div className="text-destructive">{error.publishedAt}</div>
//           )}
//         </div>

//         <div className="space-y-3">
//           <Label htmlFor="image">Cover image</Label>
//           <Input
//             type="file"
//             id="image"
//             name="image"
//             required={book == null}
//             onChange={handleFileChange}
//           />
//           {error.image && <div className="text-destructive">{error.image}</div>}
//         </div>
//       </div>
// {imagePreviewUrl ? (
//   <img src={imagePreviewUrl} height={180} width={180} alt="" />
// ) : (
//   <img src={book?.pictureUrl} height={180} width={180} alt="" />
// )}

//       <SubmitButton />
//     </form>
//   );
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" disabled={pending}>
//       {pending ? "Saving..." : "Save"}
//     </Button>
//   );
// }
