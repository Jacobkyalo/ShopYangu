"use client";

import Link from "next/link";
import { ShoppingBag, ShoppingBasket, Box } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const links: AppLink[] = [
  {
    title: "Shops",
    href: "/shops",
    icon: <ShoppingBag />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <ShoppingBasket />,
  },
  {
    title: "Metrics",
    href: "/metrics",
    icon: <Box />,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar className="!bg-white !z-50">
      <SidebarHeader className="text-3xl font-bold ml-2 mt-2 text-primary">
        <Link href="/">Shop Yangu</Link>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link: AppLink) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton size="lg" asChild>
                    <Link href={link.href}>
                      {link.icon}
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
