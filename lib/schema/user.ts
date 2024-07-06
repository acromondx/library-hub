import { z } from "zod";

export const SubmitRequestSchema = z.object({
  userId: z.string().min(5).trim(),
  description: z.string(),
  requestType: z.union(
    [z.literal("BOOK_SUGGESTION"), z.literal("COMPLAINT"), z.literal("OTHER")],
    {
      message: "Invalid Value",
    },
  ),
});
