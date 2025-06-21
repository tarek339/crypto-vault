"use client";

import { Button } from "@/components/ui/button";
import { CopyButtonProps } from "@/interfaces/components";
import { Check } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ value, title }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button onClick={() => copy(value)}>
      {copied ? (
        <>
          Copied <Check />
        </>
      ) : (
        title
      )}
    </Button>
  );
};

export default CopyButton;
