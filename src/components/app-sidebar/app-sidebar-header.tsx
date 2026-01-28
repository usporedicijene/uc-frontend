"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebarHeader() {
  const { open } = useSidebar();
  const t = useTranslations("AppSidebarHeader");
  const tCommon = useTranslations("Common");

  return (
    <SidebarHeader
      className={cn(
        "flex w-full flex-row items-center",
        open ? "justify-between gap-2 px-4" : "justify-center",
      )}
    >
      {open && (
        <Link
          aria-label={tCommon("home")}
          className={cn(
            "text-primary -ml-2 rounded-md px-2 text-lg font-bold whitespace-nowrap transition-colors",
            "focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:ring-offset-2",
            "hover:bg-primary/15", // subtle background highlight on hover
          )}
          href="/"
        >
          {t("title")}
        </Link>
      )}

      <div className="hidden md:flex">
        <SidebarTrigger />
      </div>
    </SidebarHeader>
  );
}
