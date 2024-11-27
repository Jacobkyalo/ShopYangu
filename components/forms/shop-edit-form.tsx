"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PenBox } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shop } from "@/lib/interfaces";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { apiUrl } from "@/lib/axios";
import { getShop } from "@/lib/data/shops";

export const ShopEditForm = ({
  params,
}: {
  params: { id: string | number };
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [shop, setShop] = useState<Shop | undefined>();
  const [updatingShop, setUpdatingShop] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrentShop = async () => {
      const shop = await getShop(params?.id);
      setShop(shop);
      setName(shop?.name);
      setLogo(shop?.logo);
      setDescription(shop?.description);
    };

    getCurrentShop();
  }, [params?.id]);

  const updateShopDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setUpdatingShop(true);
      await apiUrl.patch(`/shops/${params?.id}`, {
        name,
        logo,
        description,
      });
      setUpdatingShop(false);
      toast({
        title: "Success",
        description: "Shop updated successfully",
      });
      router.push(`/shops/${shop?.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong, Please try again",
        variant: "destructive",
      });
      setUpdatingShop(false);
    }
  };

  return (
    <form className="w-full space-y-6 my-6" onSubmit={updateShopDetails}>
      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <div>
          <Label className="block mb-3">Shop name</Label>
          <Input
            type="text"
            placeholder="Shop name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="w-full"
            defaultValue={name}
          />
        </div>
        <div>
          <Label className="block mb-3">Shop logo</Label>
          <Input
            type="file"
            placeholder="Shop position"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLogo(e.target.value)
            }
            className="w-full"
            defaultValue={logo}
          />
        </div>
        <div>
          <Label className="block mb-3">Shop description</Label>
          <Textarea
            placeholder="Shop description"
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
        disabled={updatingShop}
        aria-disabled={updatingShop}
      >
        <PenBox size={14} />
        {updatingShop ? "Updating..." : "Update shop"}
      </Button>
    </form>
  );
};
