import {
  AlertTriangle,
  BarChart3,
  Cookie,
  Database,
  Lock,
  Mail,
  Share2,
  Shield,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { metadata } from "./metadata";
import { PrivacyFooter } from "./privacy-footer";

export { metadata };

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  const sections = [
    {
      icon: Database,
      title: t("dataCollectionTitle"),
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">{t("dataCollectionIntro")}</p>
          <p className="text-muted-foreground">{t("dataCollectionDetails")}</p>
          <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
            {t.raw("technicalData").map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">{t("dataUsage")}</p>
        </div>
      ),
    },
    {
      icon: Cookie,
      title: t("cookiesTitle"),
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">{t("cookiesIntro")}</p>
          <p className="text-muted-foreground">{t("cookiesLocal")}</p>
        </div>
      ),
    },
    {
      icon: Share2,
      title: t("sharingTitle"),
      content: <p className="text-muted-foreground">{t("sharingText")}</p>,
    },
    {
      icon: Lock,
      title: t("securityTitle"),
      content: <p className="text-muted-foreground">{t("securityText")}</p>,
    },
    {
      icon: AlertTriangle,
      title: t("changesTitle"),
      content: <p className="text-muted-foreground">{t("changesText")}</p>,
    },
    {
      icon: Mail,
      title: t("contactTitle"),
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">{t("contactIntro")}</p>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t("contactInfo")}</p>
            <a
              className="text-primary inline-flex items-center gap-2 hover:underline"
              href="mailto:info@usporedicijene.info"
            >
              <Mail className="h-4 w-4" />
              info@usporedicijene.info
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">{t("analyticsLink")}</p>
            <a
              className="text-primary inline-flex items-center gap-2 hover:underline"
              href={`https://${t("analyticsUrl")}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <BarChart3 className="h-4 w-4" />
              {t("analyticsUrl")}
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Badge className="text-sm" variant="secondary">
              <Shield className="text-primary" />
              {t("privacyPolicy")}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Introduction */}
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("intro")}
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card className="gap-4 overflow-hidden" key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="text-primary h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{section.content}</CardContent>
              </Card>
            );
          })}
        </div>
        <PrivacyFooter />
      </div>
    </div>
  );
}
