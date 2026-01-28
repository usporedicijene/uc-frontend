"use client";

import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { setSidebarSearchHistoryOpenAction } from "@/features/app-sidebar/actions";

type PersistentCollapsibleProps = React.ComponentProps<typeof Collapsible>;

export function PersistentCollapsible({
  children,
  defaultOpen,
  ...props
}: PersistentCollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  async function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    try {
      await setSidebarSearchHistoryOpenAction(nextOpen);
    } catch {}
  }

  return (
    <Collapsible {...props} open={open} onOpenChange={handleOpenChange}>
      {children}
    </Collapsible>
  );
}

export { CollapsibleContent, CollapsibleTrigger };
