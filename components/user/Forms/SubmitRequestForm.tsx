"use client";

import { submitRequest } from "@/actions/user/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitRequestSchema } from "@/lib/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Author } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function SubmitRequestForm({ author }: { author?: Author | null }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof SubmitRequestSchema>>({
    mode: "onBlur",
    resolver: zodResolver(SubmitRequestSchema),
    defaultValues: {
      userId: "cly507n900000wcqhqfhp76j8",
    },
  });
  const isLoading = form.formState.isLoading;

  async function onSubmit(data: z.infer<typeof SubmitRequestSchema>) {
    try {
      await submitRequest(data);
      toast.success("Category updated successfully.");
    } catch (error) {
      toast.error("Error submitting request");
    }
  }

  return (
    <div className="w-[500px] max-w-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
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
                    {["BOOK_SUGGESTION", "COMPLAINT", "OTHER"].map(
                      (request) => (
                        <SelectItem key={request} value={request.toString()}>
                          {request}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>

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
                <FormLabel>Request description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: I need this book xyz"
                    {...field}
                    rows={5}
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
        </form>
      </Form>
    </div>
  );
}
