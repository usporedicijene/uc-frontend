import Script from "next/script";

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({
  url = "https://usporedicijene.info",
}: OrganizationSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Usporedi cijene",
    description:
      "Aplikacija za usporedbu cijena proizvoda u trgovačkim lancima u Hrvatskoj",
    url,
    logo: `${url}/app-logo.png`,
    image: `${url}/app-logo.png`,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HR",
      addressRegion: "Hrvatska",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@usporedicijene.info",
      availableLanguage: ["Croatian"],
    },
    areaServed: {
      "@type": "Country",
      name: "Croatia",
      sameAs: "https://en.wikipedia.org/wiki/Croatia",
    },
    knowsAbout: [
      "price comparison",
      "retail prices",
      "grocery shopping",
      "consumer savings",
      "Croatian retail market",
      "shopping optimization",
    ],
    serviceType: "Price Comparison Service",
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      id="organization-schema"
      type="application/ld+json"
    />
  );
}
