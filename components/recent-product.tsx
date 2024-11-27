import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product } from "@/lib/interfaces";

export function RecentProduct({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="space-y-8 mb-8 transition-colors">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/laptop.jpeg" alt="Avatar" />
            <AvatarFallback>
              {product?.name?.slice(0, 2)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium capitalize leading-none">
              {product?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
