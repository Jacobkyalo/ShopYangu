import { LoaderCircle } from "lucide-react";

export const FormsLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle size={15} className="animate-spin" />
    </div>
  );
};
