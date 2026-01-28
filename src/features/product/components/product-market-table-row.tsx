"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { TableRow } from "@/components/ui/table";

interface ProductMarketTableRowProps {
  href: string;
  children: ReactNode;
}

export function ProductMarketTableRow({
  children,
  href,
}: ProductMarketTableRowProps) {
  const router = useRouter();

  function handleRowClick() {
    router.push(href);
  }

  return (
    <TableRow
      className="group cursor-pointer transition-all"
      onClick={handleRowClick}
    >
      {children}
    </TableRow>
  );
}
