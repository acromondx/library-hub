import { z } from "zod";

export const AddCategorySchema = z.object({
  name: z.string().min(5).trim(),
});
