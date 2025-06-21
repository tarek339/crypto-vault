import { LoaderCircle } from "lucide-react";

const loading = () => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center">
      <LoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  );
};

export default loading;
