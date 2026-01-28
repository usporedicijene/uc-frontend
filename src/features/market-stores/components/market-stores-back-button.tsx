"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export function MarketStoresBackButton() {
  const searchParams = useSearchParams();
  const searchedValue = searchParams?.get("searchedValue") ?? "";

  return (
    <Link
      href={{ pathname: "/", query: { value: searchedValue } }}
      prefetch={true}
      scroll={false}
    >
      <Button size="icon" variant="ghost">
        <ArrowLeft className="size-5" />
      </Button>
    </Link>
  );
}
