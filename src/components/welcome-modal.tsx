"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { markWelcomeSeenAction } from "@/features/welcome/actions";

interface WelcomeModalProps {
  initialOpen?: boolean;
}

export function WelcomeModal({ initialOpen = false }: WelcomeModalProps) {
  const t = useTranslations("WelcomeModal");
  const tCommon = useTranslations("Common");
  const [open, setOpen] = useState<boolean>(initialOpen);

  async function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen && open) {
      try {
        await markWelcomeSeenAction();
      } catch {}
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">{t("title")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("subtitle")}
        </DialogDescription>
        <div className="border-b px-6 py-5 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
        </div>

        <div className="space-y-3 px-10 py-5 text-center">
          <p className="text-base leading-relaxed sm:text-lg">{t("p1")}</p>
          <p className="text-base leading-relaxed sm:text-lg">{t("p2")}</p>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {t("dm")}
          </p>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {t("eurospin")}
          </p>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {t("thanksPrefix")} (
            <a
              className="text-primary font-medium underline-offset-4 hover:underline"
              href="http://cijene.dev"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("thanksLink")}
            </a>
            ).
          </p>
        </div>

        <DialogFooter className="px-6 pb-6 sm:justify-center">
          <Button size="lg" onClick={() => handleOpenChange(false)}>
            {tCommon("ok")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
