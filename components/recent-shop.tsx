import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shop } from "@/lib/interfaces";

export function RecentShop({ shop }: { shop: Shop }) {
  return (
    <Link href={`/shops/${shop.id}`}>
      <div className="space-y-8 mb-8 transition-colors">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/shop.jpeg" alt="Avatar" />
            <AvatarFallback>
              {shop?.name?.slice(0, 2)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium capitalize leading-none">
              {shop?.name}
            </p>
            <p className="text-sm text-muted-foreground">{shop?.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
