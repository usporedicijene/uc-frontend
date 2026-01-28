import Script from "next/script";

export interface ProductOffer {
  price: number;
  currency: string;
  seller: string;
  availability: "InStock" | "OutOfStock";
  url?: string;
}

interface ProductSchemaProps {
  name: string;
  brand?: string;
  description?: string;
  barcode?: string;
  category?: string;
  offers: ProductOffer[];
  url?: string;
  imageUrl?: string;
}

export function ProductSchema({
  barcode,
  brand,
  category,
  description,
  imageUrl,
  name,
  offers,
  url,
}: ProductSchemaProps) {
  const baseUrl = "https://usporedicijene.info";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand ? `${brand} ` : ""}${name}`,
    description:
      description || `${name} - usporedba cijena u trgovinama u Hrvatskoj`,
    brand: brand
      ? {
          "@type": "Brand",
          name: brand,
        }
      : undefined,
    category,
    gtin13: barcode,
    url: url || baseUrl,
    image: imageUrl,
    offers: offers.map((offer) => ({
      "@type": "Offer",
      price: offer.price.toFixed(2),
      priceCurrency: offer.currency,
      availability: `https://schema.org/${offer.availability}`,
      seller: {
        "@type": "Organization",
        name: offer.seller,
      },
      url: offer.url,
    })),
    manufacturer: brand
      ? {
          "@type": "Organization",
          name: brand,
        }
      : undefined,
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
      id="product-schema"
      type="application/ld+json"
    />
  );
}
