"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import SignIn from "./SignIn";
import SingUp from "./SingUp";

const Authentication = () => {
  const [page, setPage] = useState(0);

  return (
    <Card className="sm:w-[500px]">
      {page === 0 ? (
        <SignIn onSingUp={() => setPage(1)} />
      ) : (
        <SingUp onSingIn={() => setPage(0)} />
      )}
    </Card>
  );
};

export default Authentication;
