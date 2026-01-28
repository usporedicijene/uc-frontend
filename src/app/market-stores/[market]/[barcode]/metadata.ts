import type { Metadata } from "next";

export const MarketStoresPageMetadata: Metadata = {
  title: "Proizvod - Lokacije trgovina",
  description:
    "Pronađite adrese i lokacije trgovina gdje možete kupiti odabrani proizvod. Saznajte gdje se nalaze najbliže trgovine.",
  keywords: [
    "lokacije trgovina",
    "adrese trgovin",
    "prodavaonice",
    "trgovine lokacije",
    "adrese prodavaonica",
    "najbliže trgovine",
  ],
};

export function getBreadcrumbItems(
  brand: string | undefined,
  name: string,
  market: string,
  barcode: string,
) {
  return [
    { name: "Početna", url: "/" },
    { name: "Trgovine", url: "/markets" },
    {
      name: `${brand ? `${brand} ` : ""}${name}`,
      url: `/market-stores/${market}/${barcode}`,
    },
  ];
}
