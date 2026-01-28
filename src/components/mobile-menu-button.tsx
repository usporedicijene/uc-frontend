"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileMenuButton() {
  const t = useTranslations("MobileTopBar");
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      aria-label={t("openMenu")}
      className="h-9 w-9 p-0"
      size="sm"
      variant="ghost"
      onClick={toggleSidebar}
    >
      <Menu className="size-4" />
    </Button>
  );
}
