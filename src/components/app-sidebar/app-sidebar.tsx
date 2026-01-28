import { Sidebar, SidebarSeparator } from "@/components/ui/sidebar";

import { ModeToggle } from "../mode-toggle";
import { AppSidebarContent } from "./app-sidebar-content";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
      <div className="px-2 pb-2">
        <ModeToggle />
      </div>
      <SidebarSeparator />
      <AppSidebarFooter />
    </Sidebar>
  );
}
