"use client";

import { signUp } from "@/actions/user/signUp";
import { Captcha, Form, Input } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SingUpProps } from "@/interfaces/components";
import { generateRandomString } from "@/lib/captchaCode";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";

const SingUp = ({ onSingIn }: SingUpProps) => {
  const [captcha, setCaptcha] = useState(generateRandomString);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [signUpState, signUpAction] = useActionState(signUp, {
    success: false,
    error: "",
    id: undefined,
  });

  const signUpFormSchema = z
    .object({
      userName: z
        .string()
        .min(1, { message: "Required field" })
        .regex(/^[a-zA-Z0-9]+$/, {
          message: "Only letters and numbers are allowed",
        }),
      password: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[A-Z]/, {
          message:
            "Contain at least one uppercase letter and one special character",
        })
        .regex(/[^a-zA-Z0-9]/, {
          message:
            "Contain at least one uppercase letter and one special character",
        })
        .trim(),
      confirmPassword: z.string(),
      confirmCaptcha: z.string(),
    })
    .superRefine(({ userName }, ctx) => {
      if (!userName) {
        ctx.addIssue({
          code: "custom",
          message: "Required field",
          path: ["userName"],
        });
      }
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (!confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Required field",
          path: ["confirmPassword"],
        });
      }
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords must match",
          path: ["confirmPassword"],
        });
      }
    })
    .superRefine(({ confirmCaptcha }, ctx) => {
      if (!confirmCaptcha && confirmCaptcha !== captcha) {
        ctx.addIssue({
          code: "custom",
          message: "Required field",
          path: ["confirmCaptcha"],
        });
        return;
      }
      if (confirmCaptcha !== captcha) {
        ctx.addIssue({
          code: "custom",
          message: "Captcha code not correct",
          path: ["confirmCaptcha"],
        });
      }
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
      if (e.path[0] === "confirmPassword") {
        setConfirmError(e.message);
      }
      if (e.path[0] === "confirmCaptcha") {
        setCaptchaError(e.message);
      }
    });
    if (!validationResult.success) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (signUpState?.success) {
      redirect(`balance/${signUpState.id}`);
    }
  }, [signUpState]);

  useEffect(() => {
    if (signUpState?.error === 5) {
      setNameError("User allready exists");
      setPasswordError("");
      setConfirmError("");
    }
  }, [signUpState]);

  return (
    <>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          or{" "}
          <span
            className="cursor-pointer font-bold underline"
            onClick={onSingIn}
          >
            sign in
          </span>{" "}
          if u already have an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={signUpAction} onSubmit={handleSubmit}>
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
            error={passwordError || confirmError}
            onChange={() => setPasswordError("")}
          />
          <Input
            label={"Confirm password"}
            name={"confirmPassword"}
            type={"password"}
            error={confirmError}
            onChange={() => setConfirmError("")}
          />
          <Captcha
            name={"captcha"}
            captchaName={"confirmCaptcha"}
            captchaError={captchaError}
            setCaptchaError={() => setCaptchaError("")}
            onChange={() => setCaptchaError("")}
            captcha={captcha}
            setCaptcha={setCaptcha}
            generateRandomString={generateRandomString}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </CardContent>
    </>
  );
};

export default SingUp;
