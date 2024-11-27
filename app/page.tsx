"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChartLine,
  PlusCircle,
  ShoppingBag,
  ShoppingBasket,
  Wallet,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RecentShop } from "@/components/recent-shop";
import { RecentProduct } from "@/components/recent-product";
import { Product, Shop } from "@/lib/interfaces";
import { getShops } from "@/lib/data/shops";
import { getProducts } from "@/lib/data/products";

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchShops = async () => {
    try {
      const shops = await getShops();
      setShops(shops);
    } catch (error: any) {}
  };

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, []);

  const totals = products.reduce(
    (acc, product) => {
      acc.totalPrice += Number(product.price) * Number(product.stockLevel);
      acc.totalStockLevel += Number(product.stockLevel);
      return acc;
    },
    { totalPrice: 0, totalStockLevel: 0 }
  );

  return (
    <div className="h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <Link
            href={"/shops/add"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlusCircle className="h-4 w-4" /> Add Shop
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shops?.length | 0}</div>
              <p className="text-xs text-muted-foreground">
                Active on the platform
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products?.length | 0}</div>
              <p className="text-xs text-muted-foreground">
                Listed across all shops
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Value of products
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh {totals?.totalPrice}</div>
              <p className="text-xs text-muted-foreground">
                Across all the shops
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Stock level
              </CardTitle>
              <ChartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totals?.totalStockLevel}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all the shops
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Shops</CardTitle>
              <CardDescription>Some of recently added shops</CardDescription>
            </CardHeader>
            <CardContent>
              {shops?.slice(0, 3)?.map((shop: Shop) => (
                <RecentShop key={shop?.id} shop={shop} />
              ))}
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>
                Some of the recently listed products
              </CardDescription>
            </CardHeader>
            <CardContent>
              {products?.slice(0, 3)?.map((product: Product) => (
                <RecentProduct key={product?.id} product={product} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
