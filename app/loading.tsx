import { FormsLoader } from "@/components/form-loader";

export default function Loading() {
  return (
    <div className="text-primary text-center flex h-screen text-2xl items-center justify-center">
      <div>
        <FormsLoader />
        <p className="mt-1 text-muted-foreground text-xs">Loading...</p>
      </div>
    </div>
  );
}
