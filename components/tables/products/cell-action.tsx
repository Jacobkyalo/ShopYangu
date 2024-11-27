"use client";

import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Product } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CellAction = ({ product }: { product: Product }) => {
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
        <DropdownMenuItem
          onClick={() => router.push(`/products/${product?.id}`)}
        >
          <Eye className="mr-1" size={15} />
          View product
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/products/${product?.id}/edit`)}
        >
          <Pencil className="mr-1" size={15} />
          Update product
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/products/${product?.id}`)}
        >
          <Trash className="mr-1" size={15} />
          Delete product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
