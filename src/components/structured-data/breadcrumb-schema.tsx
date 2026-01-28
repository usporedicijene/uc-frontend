import Script from "next/script";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function BreadcrumbSchema({
  baseUrl = "https://usporedicijene.info",
  items,
}: BreadcrumbSchemaProps) {
  if (!items.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      id="breadcrumb-schema"
      type="application/ld+json"
    />
  );
}
