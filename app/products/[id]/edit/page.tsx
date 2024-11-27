import { ProductEditForm } from "@/components/forms/product-edit-form";

export default function UpdateProduct({ params }: { params: { id: string } }) {
  return (
    <div className="h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Update Product Deatils
          </h2>
          <p className="text-sm text-muted-foreground tracking-tight">
            Update product details here
          </p>
        </div>
      </div>
      <ProductEditForm params={params} />
    </div>
  );
}
