"use client";

import { signOut } from "@/actions/user/singOut";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NavBarProps } from "@/interfaces/shared";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpToLine,
  CreditCard,
  LogOut,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import SideBar from "./SideBar";

const NavBar = ({ className }: NavBarProps) => {
  const { id } = useParams();

  return (
    <Menubar className={className}>
      <div>Logo</div>
      {id && (
        <>
          <div className="flex gap-1.5 max-[768px]:hidden">
            <MenubarMenu>
              <MenubarTrigger
                className={`flex cursor-pointer flex-row items-center gap-2.5`}
              >
                <Wallet size={18} /> Wallet
              </MenubarTrigger>

              <MenubarContent className="mt-3">
                <Link href={`/balance/${id}`}>
                  <MenubarItem className="flex cursor-pointer items-center gap-2.5">
                    <CreditCard size={18} />
                    Balance
                  </MenubarItem>
                </Link>

                <Link href={`/transactions/${id}`}>
                  <MenubarItem className="flex w-full cursor-pointer items-center gap-2.5">
                    <ArrowRightLeft size={18} />
                    Transactions
                  </MenubarItem>
                </Link>

                <Link href={`/send-currency/${id}`}>
                  <MenubarItem className="flex w-full cursor-pointer items-center gap-2.5">
                    <ArrowUpToLine size={18} />
                    Send Currency
                  </MenubarItem>
                </Link>
                <Link href={`/deposit/${id}`}>
                  <MenubarItem className="flex w-full cursor-pointer items-center gap-2.5">
                    <ArrowDownToLine size={18} />
                    Deposit
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger
                className={`flex cursor-pointer flex-row items-center gap-2.5`}
              >
                <User size={18} />
                Profile
              </MenubarTrigger>

              <MenubarContent className="mt-3">
                <Link href={`/profile/${id}`}>
                  <MenubarItem className="flex cursor-pointer flex-row items-center gap-2.5">
                    <Settings size={18} />
                    Settings
                  </MenubarItem>
                </Link>

                <MenubarItem
                  className="flex cursor-pointer flex-row items-center gap-2.5"
                  onClick={async () => {
                    await signOut();
                    redirect("/");
                  }}
                >
                  <LogOut size={18} />
                  Log out
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
        </>
      )}
      <div className="min-[769px]:hidden">
        <SideBar />
      </div>
    </Menubar>
  );
};

export default NavBar;
