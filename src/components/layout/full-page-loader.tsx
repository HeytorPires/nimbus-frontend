import React from "react";
import { Loader2 } from "lucide-react";

const FullPageLoader: React.FC = () => {
  return (
    <div
      className="flex min-h-screen flex-1 items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default FullPageLoader;
