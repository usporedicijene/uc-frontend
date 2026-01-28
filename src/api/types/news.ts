export interface NewsItem {
  id: number;
  title: string;
  content: string;
  links: NewsLink[];
  date: string;
  priority: "normal" | "high";
}

export interface NewsLink {
  title: string;
  url: string;
}

export interface NewsMetadata {
  last_updated: string;
  version: string;
  total_news: number;
}

export interface GetNewsResponse {
  news: NewsItem[];
  metadata: NewsMetadata;
}
