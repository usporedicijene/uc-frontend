import Image from "next/image";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { metadata } from "./metadata";

export { metadata };

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  const channels = [
    {
      icon: "mail",
      label: t("emailLabel"),
      url: `mailto:${t("email")}`,
      display: t("email"),
    },
    {
      icon: "reddit",
      label: t("redditLabel"),
      url: t("redditUrl"),
      display: "r/usporedicijene",
    },
    {
      icon: "github",
      label: t("githubLabel"),
      url: t("githubUrl"),
      display: t("githubUrl"),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="space-y-8">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>
        <Separator />
        <div className="space-y-6">
          {channels.map((channel, idx) => {
            return (
              <Card className="gap-4" key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Image
                      alt={channel.label}
                      height={32}
                      quality={100}
                      src={`/icons/${channel.icon}.png`}
                      width={32}
                    />
                    {channel.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    className="text-primary inline-flex items-center gap-2 hover:underline"
                    href={channel.url}
                    rel="noopener noreferrer"
                    target={
                      channel.url.startsWith("http") ? "_blank" : undefined
                    }
                  >
                    {channel.display}
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
