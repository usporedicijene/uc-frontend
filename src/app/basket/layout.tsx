import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { PageContainer } from "@/components/page-container";
import { PageTitle } from "@/components/page-title";

interface BasketLayoutProps {
  children: ReactNode;
}

export default function BasketLayout({ children }: BasketLayoutProps) {
  const t = useTranslations("BasketLayout");

  return (
    <PageContainer className="flex h-full min-h-0 flex-1 gap-4 overflow-hidden md:pb-6">
      <PageTitle subtitle={t("subtitle")} title={t("title")} />
      {children}
    </PageContainer>
  );
}
