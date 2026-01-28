import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { PageContainer } from "@/components/page-container";
import { PageTitle } from "@/components/page-title";

interface IndexStatsLayoutProps {
  children: ReactNode;
}

export default function IndexStatsLayout({ children }: IndexStatsLayoutProps) {
  const t = useTranslations("IndexStatsLayout");

  return (
    <PageContainer className="gap-4 lg:gap-6">
      <PageTitle subtitle={t("subtitle")} title={t("title")} />
      {children}
    </PageContainer>
  );
}
