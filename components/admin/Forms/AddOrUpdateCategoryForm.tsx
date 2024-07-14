"use client";

import { addCategory, updateCategory } from "@/actions/admin/category";
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
import { Errors } from "@/lib/errors";
import {
  AddCategorySchema,
  type AddCategorySchemaType,
} from "@/lib/schema/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddOrUpdateCategoryForm({
  category,
}: {
  category?: Category | null;
}) {
  const form = useForm<AddCategorySchemaType>({
    mode: "onBlur",
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      name: category?.name,
    },
  });
  const isLoading = form.formState.isLoading;

  async function onSubmit(data: AddCategorySchemaType) {
    try {
      const action = category
        ? updateCategory(category!.id, data)
        : addCategory(data);
      await action;

      form.reset();
      toast.success(
        `Category ${category ? "updated" : "added"}  successfully.`,
      );
    } catch (error) {
      if ((error as Error).message === Errors.itemAlreadyExists) {
        toast.error("Category name already exists.");
      }
    }
  }

  return (
    <Card className="w-[500px] max-w-[500px]">
      <CardHeader>
        <CardTitle>Add category</CardTitle>
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
