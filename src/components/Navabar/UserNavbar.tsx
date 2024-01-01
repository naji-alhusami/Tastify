"use client";
import { User } from "@/payload-types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import useLogout from "@/custom-hooks/use-logout";
import { useState } from "react";

const UserNavbar = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout } = useLogout();

  const account = user.email.charAt(0).toUpperCase();

  const openAccountHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          onClick={openAccountHandler}
          variant="default"
          size="sm"
          className="relative gap-1.5 rounded-full"
        >
          {account}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbar;
