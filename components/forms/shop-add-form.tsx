"use client";

import { useState } from "react";
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
import { apiUrl } from "@/lib/axios";

const addShopFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter shop name",
  }),
  description: z.string().min(1, {
    message: "Please enter shop description",
  }),
  logo: z.string().min(1, {
    message: "Please choose shop logo",
  }),
});

export const ShopAddForm = () => {
  const form = useForm<z.infer<typeof addShopFormSchema>>({
    resolver: zodResolver(addShopFormSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });
  const [addingShop, setAddingShop] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof addShopFormSchema>) => {
    try {
      setAddingShop(true);
      await apiUrl.post(`/shops`, data);
      setAddingShop(false);
      toast({
        title: "Success",
        description: "Shop added successfully",
      });
      router.push(`/shops`);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong, Please try again",
        variant: "destructive",
      });
      setAddingShop(false);
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
                <FormLabel>Shop name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Shop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop logo</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="logo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Shop description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={addingShop}
          aria-disabled={addingShop}
          className="my-6"
        >
          <PlusCircle size={14} />
          {addingShop ? "Adding..." : "Add shop"}
        </Button>
      </form>
    </Form>
  );
};
