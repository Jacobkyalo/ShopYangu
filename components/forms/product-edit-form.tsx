"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PenBox } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product, Shop } from "@/lib/interfaces";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiUrl } from "@/lib/axios";
import { FormsLoader } from "../form-loader";
import { getShops } from "@/lib/data/shops";
import { getProduct } from "@/lib/data/products";

export const ProductEditForm = ({
  params,
}: {
  params: { id: string | number };
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productShop, setProductShop] = useState<string>("");
  const [stockLevel, setStockLevel] = useState<number>(0);
  const [product, setProduct] = useState<Product | undefined>();
  const [updatingProduct, setUpdatingProduct] = useState<boolean>(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

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

  useEffect(() => {
    const getCurrentProduct = async () => {
      const product = await getProduct(params?.id);
      setProduct(product);
      setName(product?.name);
      setImage(product?.image);
      setStockLevel(product?.stockLevel);
      setPrice(product?.price.toString());
      setProductShop(product?.shop || "");
      setDescription(product?.description);
    };

    getCurrentProduct();
  }, [params?.id]);

  const updateProductDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setUpdatingProduct(true);
      await apiUrl.patch(`/products/${params?.id}`, {
        name,
        image,
        productShop,
        price,
        stockLevel,
        description,
      });
      setUpdatingProduct(false);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      router.push(`/products/${product?.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong, Please try again",
        variant: "destructive",
      });
      setUpdatingProduct(false);
    }
  };

  return (
    <form className="w-full space-y-6 my-6" onSubmit={updateProductDetails}>
      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <div>
          <Label className="block mb-3">Product name</Label>
          <Input
            type="text"
            placeholder="Product name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="w-full"
            defaultValue={name}
          />
        </div>
        <div>
          <Label className="block mb-3">Product price</Label>
          <Input
            type="text"
            placeholder="Product price"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            className="w-full"
            defaultValue={price}
          />
        </div>
        <div>
          <Label className="block mb-3">Product stock level</Label>
          <Input
            type="number"
            placeholder="Product stock level"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStockLevel(Number(e.target.value))
            }
            className="w-full"
            defaultValue={stockLevel}
          />
        </div>
        <div>
          <Label className="block mb-3">Product product</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={productShop} />
            </SelectTrigger>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading">
                  <FormsLoader />
                </SelectItem>
              ) : error ? (
                <SelectItem value="error">{error}</SelectItem>
              ) : (
                <>
                  {shops?.map((shop: Shop) => (
                    <SelectItem key={shop?.id} value={shop?.name}>
                      {shop?.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block mb-3">Product image</Label>
          <Input
            type="file"
            placeholder="Product position"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.value)
            }
            className="w-full"
            defaultValue={image}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <Label className="block mb-3">Product description</Label>
          <Textarea
            placeholder="Product description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full"
            defaultValue={description}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={updatingProduct}
        aria-disabled={updatingProduct}
      >
        <PenBox size={14} />
        {updatingProduct ? "Updating..." : "Update product"}
      </Button>
    </form>
  );
};
