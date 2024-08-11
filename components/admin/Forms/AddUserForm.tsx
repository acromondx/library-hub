/* eslint-disable @next/next/no-img-element */
"use client";

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
  UpdateUserSchemaType,
  AddUserSchemaType,
  UpdateUserSchema,
  AddUserSchema,
} from "@/lib/schema/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/lib/firebase";
import { addUser, updateUser } from "@/actions/admin/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AddOrUpdateUserForm({ user }: { user?: User | null }) {
  const router = useRouter();
  const schema = user ? UpdateUserSchema : AddUserSchema;

  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      phoneNumber: user?.phoneNumber,
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
    if (user?.profilePicture) {
      setImagePreviewUrl(user.profilePicture);
    }
  }, [currentSelectedImage, user?.profilePicture]);

  async function onSubmit(data: AddUserSchemaType | UpdateUserSchemaType) {
    try {
      let imageUrl = "";
      if (data.image instanceof File) {
        const fileRef = ref(imageDb, `libraryhub/${crypto.randomUUID()}`);
        await uploadBytes(fileRef, data.image);
        imageUrl = await getDownloadURL(fileRef);
      } else if (typeof data.image === "string") {
        imageUrl = data.image;
      }

      const submitData = {
        ...data,
        image: imageUrl || user?.profilePicture || "",
      };

      if (user) {
        await updateUser(user.id, submitData as UpdateUserSchemaType);
        toast.success("User updated.");
      } else {
        await addUser(submitData as AddUserSchemaType);
        toast.success("User added.");
      }

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4 space-y-4"
      >
        <Avatar className="size-40">
          <AvatarImage
            src={
              imagePreviewUrl
                ? imagePreviewUrl
                : (user?.profilePicture as string)
            }
          />
          <AvatarFallback>f</AvatarFallback>
        </Avatar>
        {/* {imagePreviewUrl ? (
          <img src={imagePreviewUrl} height={180} width={180} alt="" />
        ) : (
          <img
            src={user?.profilePicture as string}
            height={180}
            width={180}
            alt=""
          />
        )} */}

        <FormField
          disabled={isLoading}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
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

        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="02123456789" {...field} />
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
  );
}
