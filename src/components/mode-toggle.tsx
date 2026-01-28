"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const t = useTranslations("ModeToggle");

  const { setTheme, theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (clientTheme === "light") {
      setTheme("dark");
    } else if (clientTheme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!clientTheme) {
    return null;
  }

  const themeLabels: { [key: string]: string } = {
    light: t("light"),
    dark: t("dark"),
    system: t("system"),
  };

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const Icon = themeIcons[clientTheme as keyof typeof themeIcons];

  return (
    <div className="flex items-center justify-between gap-2 rounded-md p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
      <span className="text-sm group-data-[collapsible=icon]:hidden">
        {t("label")}: {themeLabels[clientTheme]}
      </span>
      <Button
        aria-label={`${t("label")}: ${themeLabels[clientTheme]}`}
        className="hover:bg-accent/50 dark:hover:bg-accent/30 hover:text-accent-foreground shrink-0 border"
        size="icon"
        variant="ghost"
        onClick={toggleTheme}
      >
        <Icon className="size-4" />
      </Button>
    </div>
  );
}
