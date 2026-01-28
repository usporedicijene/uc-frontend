import { AlertCircle, Bell } from "lucide-react";

import type { NewsItem } from "@/api/types/news";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NewsItemProps {
  newsItem: NewsItem;
}

export function NewsItem({ newsItem }: NewsItemProps) {
  const isHighPriority = newsItem.priority === "high";
  const Icon = isHighPriority ? AlertCircle : Bell;

  return (
    <Alert variant={isHighPriority ? "destructive" : "warning"}>
      <Icon className="h-4 w-4" />
      <div className="flex flex-col gap-2">
        <AlertTitle>{newsItem.title}</AlertTitle>
        <AlertDescription className="space-y-2">
          <p className="whitespace-pre-line">{newsItem.content}</p>
          {newsItem.links?.length > 0 && (
            <ul className="flex list-inside list-disc flex-col gap-1">
              {newsItem.links.map((link) => (
                <li key={link.url}>
                  <a
                    className="text-primary hover:underline"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-end">
            <span className="text-foreground/60 text-xs">
              {new Date(newsItem.date).toLocaleDateString("hr-HR")}
            </span>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}
