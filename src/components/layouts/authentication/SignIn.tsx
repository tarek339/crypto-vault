"use client";

import { signIn } from "@/actions/user/signIn";
import { Form, Input } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SingInProps } from "@/interfaces/components";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";

const signUpFormSchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: "Required field" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Only letters and numbers are allowed",
      }),
    password: z.string().min(1, { message: "Required field" }),
  })
  .superRefine(({ userName }, ctx) => {
    if (!userName) {
      ctx.addIssue({
        code: "custom",
        message: "Required field",
        path: ["userName"],
      });
    }
  });

const SignIn = ({ onSingUp }: SingInProps) => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signInState, signInAction] = useActionState(signIn, {
    success: false,
    error: "",
    id: undefined,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = signUpFormSchema.safeParse(data);
    validationResult.error?.errors.map((e) => {
      if (e.path[0] === "userName") {
        setNameError(e.message);
      }
      if (e.path[0] === "password") {
        setPasswordError(e.message);
      }
    });
    if (!validationResult.success) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (signInState?.success) {
      redirect(`balance/${signInState.id}`);
    }
    if (signInState.error === 1) {
      setNameError("User does not exist");
      setPasswordError("");
    }
    if (signInState.error === 2) {
      setPasswordError("Wrong password");
      setNameError("");
    }
  }, [signInState]);
  return (
    <>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          or{" "}
          <span
            className="cursor-pointer font-bold underline"
            onClick={onSingUp}
          >
            sign up
          </span>{" "}
          if u dont have an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={signInAction} onSubmit={handleSubmit}>
          <Input
            label={"User name"}
            name={"userName"}
            type={"text"}
            error={nameError}
            onChange={() => setNameError("")}
          />
          <Input
            label={"Password"}
            name={"password"}
            type={"password"}
            error={passwordError}
            onChange={() => setPasswordError("")}
          />
          <span className="text-sm">Forgot password? Contact us</span>
          <Button type="submit">Submit</Button>
        </Form>
      </CardContent>
    </>
  );
};

export default SignIn;
