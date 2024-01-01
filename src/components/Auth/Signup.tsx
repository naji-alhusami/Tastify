import React from "react";
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
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

interface SignupProps {
  setIsThanksModal: (open: boolean) => void;
  setIsAuthModal: (open: boolean) => void;
  setIsSignupForm: (open: boolean) => void;
}

const Signup = ({
  setIsThanksModal,
  setIsAuthModal,
  setIsSignupForm,
}: SignupProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        // Already user with the same email
        toast.error("This email is already in use. Sign in instead?");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: () => {
      setIsAuthModal(false);
      setIsThanksModal(true);
      toast.success(`Verification email sent to your email.`);
    },
  });

  const loginFormHandler = () => {
    setIsSignupForm(false);
  };

  const onSubmit = ({ email, password }: TAuthValidator) => {
    mutate({ email, password });
  };

  return (
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
        <Button>Sign up</Button>
        <Button variant={"ring"} onClick={loginFormHandler}>
          Log in
        </Button>
      </div>
    </form>
  );
};

export default Signup;
