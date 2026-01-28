import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <>
      <div className="mb-4">
        <Skeleton className="mb-1 h-5 w-72" />
        <Skeleton className="mb-1 h-5 w-48" />
      </div>
      <Card className="p-3 shadow-sm">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[55%] sm:w-[60%]">
                    <Skeleton className="h-5 w-full sm:w-40" />
                  </TableHead>
                  <TableHead className="w-[25%] whitespace-nowrap sm:w-[20%]">
                    <Skeleton className="h-5 w-full sm:w-24" />
                  </TableHead>
                  <TableHead className="w-[20%] text-right">
                    <Skeleton className="inline-block h-5 w-full sm:w-24" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex w-full min-w-0 items-start gap-2">
                        <MapPin className="text-primary size-4" />
                        <Skeleton className="h-5 w-full sm:max-w-[16rem]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="block w-full min-w-0 break-words whitespace-normal sm:max-w-[14rem] md:max-w-[16rem]">
                        <Skeleton className="h-5 w-full" />
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="inline-block h-6 w-full sm:w-16" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
