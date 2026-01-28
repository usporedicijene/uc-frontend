"use client";

import { useTheme } from "next-themes";
import { toast as sonnerToast, Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      theme={theme as ToasterProps["theme"]}
      {...props}
    />
  );
}

function toast(
  title: string,
  description?: string,
  action?: { label: string; onClick: () => void },
) {
  return sonnerToast.custom((id) => (
    <div className="border-border bg-background text-foreground ring-border/60 w-full rounded-md border p-4 shadow-lg ring-1 shadow-black/5 md:max-w-[420px]">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-none font-medium">{title}</p>
          {description ? (
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          ) : null}
        </div>
        {action ? (
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={() => {
              action.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {action.label}
          </button>
        ) : null}
      </div>
    </div>
  ));
}

export { toast, Toaster };
