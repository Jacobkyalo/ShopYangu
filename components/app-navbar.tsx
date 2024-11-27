"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ShoppingBasket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppNavbar = () => {
  return (
    <header className="flex sticky bg-background top-0 z-50  w-full items-center justify-between p-4 border-b">
      <div className="flex items-center gap-x-3">
        <SidebarTrigger />
        <h2 className="font-bold text-lg capitalize sm:text-xl text-foreground">
          Welcome, Admin
        </h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/assets/avatars/avatar2.jpg" alt="admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none capitalize">
                Shop Yangu Admin
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@shopyangu.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/">
              <DropdownMenuItem className="gap-2">
                <LayoutDashboard size={16} />
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href="/shops">
              <DropdownMenuItem className="gap-2">
                <ShoppingBag size={16} />
                Shops
              </DropdownMenuItem>
            </Link>
            <Link href="/products">
              <DropdownMenuItem className="gap-2">
                <ShoppingBasket size={16} />
                Products
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
