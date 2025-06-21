"use client";

import { signOut } from "@/actions/user/singOut";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpToLine,
  LogIn,
  LogOut,
  Menu,
  User,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

const SideBar = () => {
  const { id } = useParams();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={32} />
      </SheetTrigger>

      <SheetContent
        className="flex flex-col gap-5"
        aria-describedby={undefined}
      >
        <SheetHeader className="flex w-full flex-row items-center justify-between">
          <SheetTitle>Logo</SheetTitle>
          <SheetClose asChild>
            <X size={32} />
          </SheetClose>
        </SheetHeader>

        <div className="flex justify-center">
          {id ? (
            <div className="flex flex-col gap-5">
              <SheetClose asChild>
                <Link
                  href={`/balance/${id}`}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <Wallet />
                  Wallet
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href={`/transactions/${id}`}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <ArrowRightLeft />
                  Transactions
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href={`/send-currency/${id}`}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <ArrowUpToLine />
                  Send Currency
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href={`/deposit/${id}`}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <ArrowDownToLine />
                  Deposit
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href={`/profile/${id}`}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <User />
                  Profile
                </Link>
              </SheetClose>

              <SheetClose
                asChild
                onClick={async () => {
                  await signOut();
                  redirect("/");
                }}
              >
                <Link
                  href={"/"}
                  className={`flex cursor-pointer items-center gap-2.5`}
                >
                  <LogOut />
                  Log out
                </Link>
              </SheetClose>
            </div>
          ) : (
            <SheetClose asChild>
              <Link
                href={`/authentication`}
                className={`flex cursor-pointer items-center gap-2.5`}
              >
                <LogIn />
                Authentication
              </Link>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
