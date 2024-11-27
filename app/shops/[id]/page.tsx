"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PenBox, Trash } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormsLoader } from "@/components/form-loader";
import { Product, Shop } from "@/lib/interfaces";
import { deleteShop, getShop } from "@/lib/data/shops";
import { toast } from "@/hooks/use-toast";
import { getProducts } from "@/lib/data/products";

export default function SingleShop({
  params,
}: {
  params: { id: string | number };
}) {
  const [shop, setShop] = useState<Shop | undefined>();
  const [deletingShop, setDeletingShop] = useState<boolean>(false);
  const [gettingShop, setGettingShop] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const deleteCurrentShop = async (e: any) => {
    e.preventDefault();
    const products = await getProducts();

    const shopProducts = products.filter(
      (product: Product) => product?.shop === shop?.name
    );

    if (shopProducts.length > 0) {
      toast({
        title: "Error",
        description: `This shop has ${shopProducts.length} active products. Please remove or reassign them before deleting the shop.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setDeletingShop(true);
      await deleteShop(params?.id);
      setDeletingShop(false);
      toast({
        title: "Success",
        description: "Shop deleted succesfully",
      });
      router.push("/shops");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.shop ||
          "Something went wrong, Please try again",
        variant: "destructive",
      });
      setDeletingShop(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSingleShop = async () => {
    try {
      setGettingShop(true);
      const shop = await getShop(params?.id);
      setShop(shop);
      setGettingShop(false);
    } catch (error: any) {
      setError("Error occurred when getting shop");
      setGettingShop(false);
    }
  };

  useEffect(() => {
    getSingleShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {gettingShop ? (
        <div className="mt-6">
          <FormsLoader />
        </div>
      ) : error ? (
        <div className="mt-6 text-muted-foreground">{error}</div>
      ) : (
        <>
          <div className="h-full">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Shop Details
                </h2>
                <p className="text-sm text-muted-foreground tracking-tight">
                  View shop details here
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Image
                src="/shop.jpeg"
                alt="shop_name"
                width={150}
                height={200}
                className="rounded-lg mb-6"
              />
              <div className="flex flex-col gap-y-1 my-6">
                <div className="flex items-center gap-x-2">
                  <strong>Shop name:</strong>
                  <span className="text-muted-foreground capitalize">
                    {shop?.name}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <strong>Shop description:</strong>
                  <span className="text-muted-foreground">
                    {shop?.description}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap mt-8">
                  <Link
                    href={`/shops/${shop?.id}/edit`}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    <PenBox className="h-4 w-4" /> Update shop
                  </Link>
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={deleteCurrentShop}
                    disabled={deletingShop}
                    aria-disabled={deletingShop}
                  >
                    <Trash className="h-4 w-4" /> Delete shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
