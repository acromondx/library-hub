import { z } from "zod";

//schemas

export const ImageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"));

export const AddBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  isbn: z
    .string()
    .min(5, { message: "ISBN must be at least 5 characters long" }),
  publishedAt: z.coerce.date().transform((date) => new Date(date)),
  copies: z.coerce
    .number()
    .int()
    .min(1, { message: "At least one copy is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(680, { message: "Description too long" }),

  authorId: z.string().min(1, { message: "Author is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),

  image: ImageSchema,
});

export const UpdateBookSchema = AddBookSchema.extend({
  image: ImageSchema.optional(),
});

export const AddAuthorSchema = z.object({
  name: z.string().min(5).trim(),
});

export const AddCategorySchema = z.object({
  name: z.string().min(5).trim(),
});

//type exports
export type AddBookSchemaType = z.infer<typeof AddBookSchema>;
export type UpdateBookSchemaType = z.infer<typeof UpdateBookSchema>;

export type AddAuthorSchemaType = z.infer<typeof AddAuthorSchema>;
export type AddCategorySchemaType = z.infer<typeof AddCategorySchema>;
