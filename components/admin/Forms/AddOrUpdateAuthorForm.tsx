"use client";

import { addAuthor, updateAuthor } from "@/actions/admin/author";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddAuthorSchema, type AddAuthorSchemaType } from "@/lib/schema/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Author } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddOrUpdateAuthorForm({ author }: { author?: Author | null }) {
  const router = useRouter();

  const form = useForm<AddAuthorSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddAuthorSchema),
    defaultValues: {
      name: author?.name,
    },
  });
  const isLoading = form.formState.isLoading;

  async function onSubmit(data: AddAuthorSchemaType) {
    try {
      const action = author ? updateAuthor(author!.id, data) : addAuthor(data);
      await action;

      form.reset();
      router.refresh();

      toast.success("Author updated successfully.");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);

      console.log(error);
    }
  }

  return (
    <Card className="w-[500px] max-w-[500px]">
      <CardHeader>
        <CardTitle>Add author</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
      </CardContent>
    </Card>
  );
}
