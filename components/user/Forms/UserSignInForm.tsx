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
import { Errors } from "@/lib/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Loader, Upload } from "lucide-react";
import { SignInSchemaType, signInSchema } from "@/lib/schema/auth";
import { signIn } from "@/actions/user/auth";

export function UserSignInForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInSchemaType) {
    console.log(JSON.stringify(data));

    try {
      setIsSubmitting(true);
      const res = await signIn({ data: data });
      setIsSubmitting(false);

      form.reset();
      router.push("/browse");
      console.log(res);
    } catch (error) {
      setIsSubmitting(false);
      if ((error as Error).message === Errors.invalidCredentials) {
        toast.error("Invalid credentials");
      }
      if ((error as Error).message === Errors.changeYourPassword) {
        router.push("/auth/change-password");
        toast.error("Please change your password");
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="user@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isSubmitting && (
                <Loader
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {isSubmitting ? "Processing" : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/user/sign-up"
            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
          >
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}
