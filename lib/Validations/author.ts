import { z } from "zod";

export const AddAuthorSchema = z.object({
  name: z.string().min(5).trim(),
});
