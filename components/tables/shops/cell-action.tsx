"use client";

import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shop } from "@/lib/interfaces";

export const CellAction = ({ shop }: { shop: Shop }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/shops/${shop?.id}`)}>
          <Eye className="mr-1" size={15} />
          View shop
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/shops/${shop?.id}/edit`)}
        >
          <Pencil className="mr-1" size={15} />
          Update shop
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/shops/${shop?.id}`)}>
          <Trash className="mr-1" size={15} />
          Delete shop
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
