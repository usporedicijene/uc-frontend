import { Apple, Mail, Shield, Smartphone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebarFooter() {
  const t = useTranslations("AppSidebarFooter");
  const tCommon = useTranslations("Common");

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={t("android")}>
            <Link
              href="https://play.google.com/store/apps/details?id=info.usporedicijene.usporedicijene"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Smartphone className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {t("android")}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={t("ios")}>
            <Link
              href="https://apps.apple.com/hr/app/usporedi-cijene/id6746760702"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Apple className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {t("ios")}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={tCommon("privacy")}>
            <Link href="/privacy">
              <Shield className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {tCommon("privacy")}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={tCommon("contact")}>
            <Link href="/contact">
              <Mail className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {tCommon("contact")}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
