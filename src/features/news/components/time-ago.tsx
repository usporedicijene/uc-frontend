"use client";

import { useTranslations } from "next-intl";

import { getTimeAgoText } from "@/lib/time";

interface TimeAgoProps {
  timestamp: string;
}

export function TimeAgo({ timestamp }: TimeAgoProps) {
  const t = useTranslations("NewsPage");

  return (
    <span className="text-foreground">{getTimeAgoText(timestamp, t)}</span>
  );
}

