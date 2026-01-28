import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { getSidebarStateCookie } from "@/lib/cookies/app-sidebar";

interface SidebarProviderWrapperProps {
  children: ReactNode;
}

export async function SidebarProviderWrapper({
  children,
}: SidebarProviderWrapperProps) {
  const sidebarDefaultOpen = await getSidebarStateCookie();

  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen}>
      {children}
    </SidebarProvider>
  );
}
