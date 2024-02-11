import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DomainSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-80" />
      ))}
    </div>
  );
};

export default DomainSkeleton;
