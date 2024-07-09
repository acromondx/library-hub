"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UserSigI() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <AuthForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

const userAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormData = z.infer<typeof userAuthSchema>;

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      // const res = await fetch("/api/auth/login/magic-link", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      console.log(data);

      setIsLoading(false);

      // if (!res.ok) {
      //   return toast.error("Failed to send Magic link!");
      // }

      reset();
      toast.info("Magic Link sent!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={cn("mt-4 flex flex-col gap-4")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              disabled={isLoading || isGithubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="mt-2 text-xs text-destructive">
                {errors?.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading || isGithubLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send magic link
          </button>
        </div>
      </form>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">/</span>
      </div>
    </div>
  );
}
