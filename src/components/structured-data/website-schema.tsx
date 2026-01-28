import Script from "next/script";

interface WebsiteSchemaProps {
  url?: string;
}

export function WebsiteSchema({
  url = "https://usporedicijene.info",
}: WebsiteSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Usporedi cijene",
    description:
      "Usporedi cijene proizvoda u svim velikim trgovačkim lancima u Hrvatskoj",
    url,
    image: `${url}/app-logo.png`,
    publisher: {
      "@type": "Organization",
      name: "Usporedi cijene",
      logo: {
        "@type": "ImageObject",
        url: `${url}/app-logo.png`,
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/?value={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Usporedi cijene",
      description: "Aplikacija za usporedbu cijena proizvoda",
      applicationCategory: "Shopping",
      operatingSystem: "Web Browser",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@usporedicijene.info",
        availableLanguage: ["Croatian"],
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        category: "Free",
      },
      featureList: [
        "Usporedba cijena proizvoda",
        "Pretraživanje po trgovinama",
        "Košarica proizvoda",
        "Statistike cijena",
        "Interaktivna karta",
        "Praćenje promjena cijena",
      ],
    },
    inLanguage: "hr-HR",
    audience: {
      "@type": "Audience",
      geographicArea: {
        "@type": "Country",
        name: "Croatia",
      },
    },
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      id="website-schema"
      type="application/ld+json"
    />
  );
}
