"use client";

import { deleteUser } from "@/actions/user/deleteUser";
import { Alert, Form, Input, Modal } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { DeleteUserProps } from "@/interfaces/components";
import { CircleAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const DeleteUser = ({ id }: DeleteUserProps) => {
  const [error, setError] = useState("");
  const [deleteState, deleteAction] = useActionState(deleteUser, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (deleteState.success) {
      redirect("/");
    }
    if (deleteState.error) {
      setError(deleteState.error);
    }
  }, [deleteState]);

  return (
    <Modal
      triggerTitle={
        <span className="cursor-pointer font-bold text-primary">
          Delete Profile
        </span>
      }
      dialogTitle={"Delete profile"}
      description={" Are you sure you want to delete your profile?"}
      subDescription={"This action is irreversible."}
    >
      <Alert
        variant="warning"
        icon={<CircleAlert className="h-4 w-4" />}
        title={"Caution"}
        description={
          "Once deleted, your profile cannot be restored. If you have a balance, it will be lost. Make sure to withdraw your balance to another wallet before deleting your profile."
        }
      />
      <Form action={deleteAction}>
        <input type="text" name="id" value={id ?? ""} readOnly hidden />
        <Input
          label={"Password"}
          name={"password"}
          type={"password"}
          error={error ?? ""}
        />
        <Button type="submit">Delete</Button>
      </Form>
    </Modal>
  );
};

export default DeleteUser;
