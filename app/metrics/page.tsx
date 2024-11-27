"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "@/lib/data/products";
import { Product } from "@/lib/interfaces";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toast } from "@/hooks/use-toast";

export default function Metrics() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Error occurred while getting products",
        });
      }
    };

    fetchProducts();
  }, []);

  const shopStockLevels = products.reduce(
    (acc: { [key: string]: number }, product) => {
      if (product?.shop !== undefined) {
        acc[product?.shop] =
          (acc[product?.shop] || 0) + Number(product.stockLevel);
      }
      return acc;
    },
    {}
  );

  const topShops = Object.entries(shopStockLevels)
    .sort((a, b) => b[1] - a[1])
    .map(([shop, stockLevel]) => ({ shop, stockLevel }));

  const chartData = products.map((product: Product) => ({
    name: product.name,
    stockLevel: product.stockLevel,
  }));

  const chartConfig = {
    stockLevel: {
      label: "Stock Level",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  const chartConfigShops = {
    stockLevel: {
      label: "Stock Level",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between ">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Metrics</h2>
            <p className="text-sm text-muted-foreground tracking-tight">
              See all shops and products metrics
            </p>
          </div>
          <Link
            href={"/shops"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Eye className="h-4 w-4" /> View Shops
          </Link>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Level</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                  dataKey="stockLevel"
                  fill="var(--color-stockLevel)"
                  radius={8}
                >
                  <LabelList
                    position="center"
                    offset={12}
                    className="fill-white"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Products stock levels <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Across all the shops
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top shops</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigShops}>
              <BarChart accessibilityLayer data={topShops}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="shop"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="stockLevel"
                  fill="var(--color-stockLevel)"
                  radius={8}
                >
                  <LabelList
                    position="center"
                    offset={12}
                    className="fill-white"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Top shops <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Across the platform
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const stockLevel = payload[0].value;
    let stockStatus = "";

    if (stockLevel > 5) stockStatus = "In Stock";
    else if (stockLevel > 0) stockStatus = "Low Stock";
    else stockStatus = "Out of Stock";

    return (
      <div className="p-2 bg-white border shadow rounded">
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground">
          Stock Level: <span className="font-semibold">{stockLevel}</span>
        </p>
        <p>
          Stock status:{" "}
          <span
            className={cn(
              stockStatus === "In Stock"
                ? "text-green-500"
                : stockStatus === "Low Stock"
                ? "text-orange-500"
                : "text-destructive",
              "font-semibold"
            )}
          >
            {stockStatus}
          </span>
        </p>
      </div>
    );
  }
  return null;
};
