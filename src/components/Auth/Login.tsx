"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthValidator,
  type TAuthValidator,
} from "@/lib/validators/account-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginProps {
  setIsSignupForm: (open: boolean) => void;
}

const Login = ({ setIsSignupForm }: LoginProps) => {
  const [isLoginSeller, setIsLoginSeller] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const { mutate, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully");

      router.refresh();
      // test
      // if (origin) {
      //   router.push(`/${origin}`);
      //   return;
      // }

      if (isLoginSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  const SignupFormHandler = () => {
    setIsSignupForm(true);
  };

  const onSubmit = ({ email, password }: TAuthValidator) => {
    mutate({ email, password });
  };

  return (
    <>
      <h1 className="text-md text-rose-500 font-bold text-center">
        {isLoginSeller ? "As Seller" : "As Buyer"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              className={cn({
                "focus-visible:ring-red-500": errors.email,
              })}
              placeholder="you@example.com"
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1 py-2 pb-8">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              className={cn({
                "focus-visible:ring-red-500": errors.password,
              })}
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button>Log in</Button>
          <Button variant={"ring"} onClick={SignupFormHandler}>
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative py-4">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      <div className="relative w-full">
        {isLoginSeller ? (
          <Button
            onClick={() => setIsLoginSeller(false)}
            variant="secondary"
            disabled={isLoading}
          >
            Continue as customer
          </Button>
        ) : (
          <Button
            onClick={() => setIsLoginSeller(true)}
            variant="secondary"
            disabled={isLoading}
          >
            Continue as seller
          </Button>
        )}
      </div>
    </>
  );
};

export default Login;
