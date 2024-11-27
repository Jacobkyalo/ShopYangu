"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { ProductsTable } from "@/components/tables/products/data-table";
import { getProducts } from "@/lib/data/products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (error: any) {
        setError("Error occurred while getting products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
            <p className="text-sm text-muted-foreground tracking-tight">
              Manage all products here
            </p>
          </div>
          <Link
            href={"/products/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlusCircle className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>
      <div>
        <ProductsTable data={products} error={error} loading={loading} />
      </div>
    </div>
  );
}
