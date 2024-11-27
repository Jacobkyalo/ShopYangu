"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiUrl } from "@/lib/axios";
import { getShops } from "@/lib/data/shops";
import { Shop } from "@/lib/interfaces";
import { FormsLoader } from "@/components/form-loader";

const addProductFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter product name",
  }),
  description: z.string().min(1, {
    message: "Please enter product description",
  }),
  image: z.string().min(1, {
    message: "Please choose product image",
  }),
  price: z.string().min(1, {
    message: "Please enter product price",
  }),
  stockLevel: z.string().min(1, {
    message: "Please enter product stock level",
  }),
  shop: z.string().min(1, {
    message: "Please select product shop",
  }),
});

export const ProductAddForm = () => {
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      shop: "",
      stockLevel: "",
      price: "",
    },
  });
  const [addingProduct, setAddingProduct] = useState<boolean>(false);
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

  const onSubmit = async (data: z.infer<typeof addProductFormSchema>) => {
    try {
      setAddingProduct(true);
      await apiUrl.post(`/products`, data);
      setAddingProduct(false);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      router.push(`/products`);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong, Please try again",
        variant: "destructive",
      });
      setAddingProduct(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price (Ksh)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product stock level</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Product stock level"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product shop</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product shop" />
                    </SelectTrigger>
                  </FormControl>
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

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product image</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 mt-4 gap-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={addingProduct}
          aria-disabled={addingProduct}
          className="my-6"
        >
          <PlusCircle size={14} />
          {addingProduct ? "Adding..." : "Add product"}
        </Button>
      </form>
    </Form>
  );
};
