"use client";

import { changeUserName } from "@/actions/user/changeUserName";
import { Card, Form, Input } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChangeUserNameProps } from "@/interfaces/components";
import { useActionState, useEffect, useState } from "react";

const ChangeUserName = ({ id }: ChangeUserNameProps) => {
  const [nameError, setNameError] = useState("");
  const [changeUserNameState, changeUserNameAction] = useActionState(
    changeUserName,
    {
      success: false,
      error: "",
    },
  );
  const { toast } = useToast();

  useEffect(() => {
    if (changeUserNameState?.error === 1) {
      setNameError("Required field");
    }
    if (changeUserNameState?.error === 2) {
      setNameError("User name already exist!");
    }

    if (changeUserNameState.success) {
      setNameError("");
      toast({
        variant: "default",
        title: "User name changed",
        description: "Store your new user name safely",
      });
    }
  }, [changeUserNameState, toast]);

  return (
    <Card
      title={"Change user name"}
      description={"Store your new user name safely"}
    >
      <Form action={changeUserNameAction}>
        <input type="text" name="id" value={id} readOnly hidden />
        <Input
          label={"User name"}
          name={"userName"}
          type={"text"}
          error={nameError}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default ChangeUserName;
