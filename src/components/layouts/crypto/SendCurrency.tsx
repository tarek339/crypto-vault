"use client";

import { sendCurrency } from "@/actions/crypto/sendCurrency";
import { Alert, Card, Form, Input, Select } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PayOutProps } from "@/interfaces/components";
import { CircleAlert } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

const PayOut = ({ id, availableAmount }: PayOutProps) => {
  const [amountError, setAmountError] = useState("");
  const [adressError, setAdressError] = useState("");
  const [optionError, setOptionError] = useState("");
  const [option, setOption] = useState("BTC");
  const [payOutState, payOutAction] = useActionState(sendCurrency, {
    success: false,
    error: 0,
  });
  const { toast } = useToast();

  const selectItems = (value: string) => {
    setOption(value);
    setOptionError("");
    setAmountError("");
    setAdressError("");
  };

  useEffect(() => {
    if (payOutState.success === true) {
      toast({
        variant: "default",
        title: "Amount successfully paid out",
        description: "Progress can take up to 24 hours",
      });
      setAmountError("");
      setAdressError("");
    }

    if (payOutState.error === 1) {
      setAmountError("Enter an amount");
      setAdressError("");
    }
    if (payOutState.error === 2) {
      setAmountError("Enter a valid amount");
      setAdressError("");
    }
    if (payOutState.error === 3) {
      setAdressError("Enter a wallet address");
      setAmountError("");
    }
    if (payOutState.error === 4) {
      setAdressError("Address is invalid");
      setAmountError("");
    }
    if (payOutState.error === 5) {
      toast({
        variant: "destructive",
        title: "User not found",
        description: "Refresh the page and try again",
      });
    }
    if (
      typeof payOutState.error === "string" &&
      payOutState.success === false
    ) {
      toast({
        variant: "destructive",
        title: payOutState.error,
        description: "Please try again or contact support",
      });
    }
  }, [payOutState, toast]);

  return (
    <Card
      title="Send currency"
      description={`Available balance: ${availableAmount} BTC`}
      subdescription="Transaction fee is 0.35%"
    >
      <Form action={payOutAction}>
        <Alert
          variant="warning"
          icon={<CircleAlert className="h-4 w-4" />}
          title={"Caution"}
          description={` 
           By entering a wrong address, you lose your funds.
           Please double-check the address before sending any funds.
           No recovery or reset is possible.
          `}
        />
        <input type="text" name="id" value={id} readOnly hidden />
        <Select
          onValueChange={selectItems}
          placeholder={option}
          selectItems={["BTC"]}
          label={"Select currency"}
          name={"currency"}
          error={optionError}
          readonly={true}
        />
        <Input
          label={"Amount"}
          name={"amountToSend"}
          type={"text"}
          error={amountError}
          onChange={() => {
            setAmountError("");
            setAdressError("");
          }}
        />
        <Input
          label={"Wallet address"}
          name={"toAddress"}
          type={"text"}
          error={adressError}
          onChange={() => {
            setAdressError("");
            setAmountError("");
          }}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default PayOut;
