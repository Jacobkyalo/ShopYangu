import { ShopAddForm } from "@/components/forms/shop-add-form";

export default function AddShop() {
  return (
    <div className="h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Shop</h2>
          <p className="text-sm text-muted-foreground tracking-tight">
            Create new shop here
          </p>
        </div>
      </div>
      <ShopAddForm />
    </div>
  );
}
