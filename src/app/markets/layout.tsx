import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { PageContainer } from "@/components/page-container";
import { PageTitle } from "@/components/page-title";

interface MarketsLayoutProps {
  children: ReactNode;
}

export default function MarketsLayout({ children }: MarketsLayoutProps) {
  const t = useTranslations("MarketsLayout");

  return (
    <PageContainer className="gap-4">
      <PageTitle subtitle={t("subtitle")} title={t("title")} />
      {children}
    </PageContainer>
  );
}
