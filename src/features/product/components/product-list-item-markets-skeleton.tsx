import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonItem = ({ className }: { className?: string }) => (
  <Skeleton className={`bg-black/5 dark:bg-white/5 ${className}`} />
);

export function ProductListItemMarketsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 px-3 pb-3">
      {/* Best price summary skeleton */}
      <div>
        <div className="mb-3 flex h-6 items-center">
          <SkeletonItem className="h-[22px] w-32" />
        </div>

        <div className="overflow-hidden rounded-md border p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            {/* Markets list skeleton */}
            <div className="order-2 grid min-w-0 grid-cols-2 gap-3 sm:order-1 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
              {Array.from({ length: 1 }).map((_, idx) => (
                <div
                  className="bg-background/70 dark:bg-background/40 inline-flex w-full min-w-0 items-center gap-2 rounded-md p-2 text-xs sm:w-auto sm:whitespace-nowrap"
                  key={idx}
                >
                  <SkeletonItem className="h-8 w-8 shrink-0 rounded-md" />
                  <SkeletonItem className="h-6 w-24 min-w-0 flex-1 sm:max-w-28" />
                </div>
              ))}
            </div>

            {/* Price & savings skeleton */}
            <div className="order-1 flex items-center justify-between gap-2 sm:order-2 sm:justify-end sm:gap-6">
              <SkeletonItem className="h-7 w-24" />
              <SkeletonItem className="h-5 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Other stores table skeleton */}
      <div className="mt-2">
        <SkeletonItem className="h-[22px] w-32" />
      </div>

      <Table className="text-sm">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground w-1/2" />
            <TableHead className="text-muted-foreground text-right">
              <SkeletonItem className="ml-auto h-4 w-16" />
            </TableHead>
            <TableHead className="text-muted-foreground text-right">
              <SkeletonItem className="ml-auto h-4 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, idx) => (
            <TableRow className="hover:bg-muted/40" key={idx}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <SkeletonItem className="h-8 w-8 shrink-0 rounded-md" />
                  <SkeletonItem className="h-6 w-28" />
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold">
                <SkeletonItem className="ml-auto h-5 w-16" />
              </TableCell>
              <TableCell className="text-right text-xs">
                <SkeletonItem className="ml-auto h-4 w-10" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center pt-3">
        <SkeletonItem className="h-9 w-28" />
      </div>
    </div>
  );
}
