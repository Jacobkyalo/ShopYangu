import { ShopEditForm } from "@/components/forms/shop-edit-form";

export default function UpdateShop({ params }: { params: { id: string } }) {
  return (
    <div className="h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Update Shop Deatils
          </h2>
          <p className="text-sm text-muted-foreground tracking-tight">
            Update shop details here
          </p>
        </div>
      </div>
      <ShopEditForm params={params} />
    </div>
  );
}
