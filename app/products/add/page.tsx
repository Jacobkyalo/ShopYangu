import { ProductAddForm } from "@/components/forms/product-add-form";

export default function AddProduct() {
  return (
    <div className="h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Product</h2>
          <p className="text-sm text-muted-foreground tracking-tight">
            Create new product here
          </p>
        </div>
      </div>
      <ProductAddForm />
    </div>
  );
}
