"use client";

import { changePassword } from "@/actions/user/changePassword";
import { Card, Form, Input } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChangePasswordProps } from "@/interfaces/components";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";

const signUpFormSchema = z
  .object({
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
  });

const ChangePassword = ({ id }: ChangePasswordProps) => {
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [changePasswordState, changePasswordAction] = useActionState(
    changePassword,
    {
      success: false,
      error: "",
    },
  );
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = signUpFormSchema.safeParse(data);
    validationResult.error?.errors.map((e) => {
      if (e.path[0] === "password") {
        setPasswordError(e.message);
      }
      if (e.path[0] === "confirmPassword") {
        setConfirmError(e.message);
      }
    });
    if (!validationResult.success) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (changePasswordState?.error === 1) {
      setConfirmError("");
      setPasswordError("User not found");
    }
    if (changePasswordState?.error === 2) {
      setConfirmError("New password cannot previous password");
      setPasswordError("");
    }
    if (changePasswordState.success) {
      toast({
        variant: "default",
        title: "Password changed",
        description: "Store your new password safely",
      });
      setPasswordError("");
      setConfirmError("");
    }
  }, [changePasswordState, toast]);

  return (
    <Card
      title={"Change password"}
      description={"Store your new password safely"}
      subdescription="Reset is not possible"
    >
      <Form action={changePasswordAction} onSubmit={handleSubmit}>
        <input type="text" name="id" value={id} readOnly hidden />
        <Input
          label={"Password"}
          name={"password"}
          type={"password"}
          error={passwordError || confirmError}
          onChange={() => {
            setPasswordError("");
            setConfirmError("");
          }}
        />
        <Input
          label={"Confirm password"}
          name={"confirmPassword"}
          type={"password"}
          error={confirmError}
          onChange={() => {
            setConfirmError("");
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default ChangePassword;
