import { Skeleton } from "@/components/ui/skeleton";

export function NewsSectionSkeleton() {
  return (
    <section className="w-full max-w-4xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div className="border-border rounded-lg border p-4" key={i}>
              <div className="flex gap-3">
                <Skeleton className="h-4 w-4 shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-end">
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
