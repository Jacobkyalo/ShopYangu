"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Shop } from "@/lib/interfaces";
import { ShopsTable } from "@/components/tables/shops/data-table";
import { getShops } from "@/lib/data/shops";

export default function Shops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const shops = await getShops();
        setShops(shops);
        setLoading(false);
      } catch (error: any) {
        setError("Error occurred while getting shops");
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Shops</h2>
            <p className="text-sm text-muted-foreground tracking-tight">
              Manage all shops here
            </p>
          </div>
          <Link
            href={"/shops/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlusCircle className="h-4 w-4" /> Add Shop
          </Link>
        </div>
      </div>
      <div>
        <ShopsTable data={shops} error={error} loading={loading} />
      </div>
    </div>
  );
}
