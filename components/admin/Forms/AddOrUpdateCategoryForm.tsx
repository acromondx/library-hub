"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategory, updateCategory } from "@/actions/admin/category";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AddCategorySchema, AddCategorySchemaType } from "@/lib/schema/admin";
import { Errors } from "@/lib/errors";

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
