"use client";

import { generateNewBtcAddress } from "@/actions/crypto/generateNewBtcAddress";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";

interface DepositProps {
  id: string;
}

const Deposit = ({ id }: DepositProps) => {
  const [generateState, generateAction] = useActionState(
    generateNewBtcAddress,
    {
      success: false,
      error: "",
    },
  );

  useEffect(() => {
    if (generateState.success) {
      console.log("New address generated successfully");
    } else if (generateState.error) {
      console.error("Error generating new address:", generateState.error);
    }
  }, [generateState]);

  return (
    <form action={generateAction}>
      <input type="text" name="id" value={id} hidden readOnly />
      <Button type="submit" className="w-full">
        Generate new Address
      </Button>
    </form>
  );
};

export default Deposit;
