import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => (
  <div className="space-y-8 py-20">
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-12 w-3/4 max-w-lg" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
      <Skeleton className="h-80 w-full rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);
export default LoadingSkeleton;
