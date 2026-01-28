import type { Metadata } from "next";

import {
  BASE_URL,
  createStoreListText,
  STORE_NAMES,
} from "./metadata-constants";

interface SearchMetadataOptions {
  searchTerm: string;
  resultsCount?: number;
  cityName?: string;
}

export function generateSearchMetadata({
  cityName,
  resultsCount,
  searchTerm,
}: SearchMetadataOptions): Metadata {
  // Create location suffix
  const locationText = cityName ? ` u ${cityName}` : " u Hrvatskoj";

  // Generate dynamic title based on search term
  const title = `${searchTerm} - Usporedi cijene${locationText}`;

  // Generate dynamic description
  const description = resultsCount
    ? `Pronađeno ${resultsCount} proizvoda za "${searchTerm}"${locationText}. Usporedi cijene u ${createStoreListText()} i drugim trgovinama. Najdi najbolju cijenu!`
    : `Pretraži cijene za "${searchTerm}"${locationText}. Usporedi cijene u svim velikim trgovačkim lancima i pronađi najjeftiniju opciju za svoju kupovinu.`;

  // Generate keywords
  const keywords = [
    searchTerm,
    `${searchTerm} cijena`,
    `${searchTerm} cijene`,
    `${searchTerm} usporedba`,
    `${searchTerm} najbolja cijena`,
    `kupiti ${searchTerm}`,
    ...(cityName
      ? [
          `${searchTerm} ${cityName}`,
          `cijene ${searchTerm} ${cityName}`,
          `kupiti ${searchTerm} ${cityName}`,
        ]
      : []),
    "usporedi cijene",
    "trgovine hrvatska",
    ...STORE_NAMES.map((store) => store.toLowerCase()),
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/?value=${encodeURIComponent(searchTerm)}`,
    },
  };
}

// Helper to detect product categories for better SEO
export function getCategoryFromSearchTerm(
  searchTerm: string,
): string | undefined {
  const lowerTerm = searchTerm.toLowerCase();

  if (
    ["mlijeko", "sir", "jogurt", "vrhnje", "maslo"].some((term) =>
      lowerTerm.includes(term),
    )
  ) {
    return "mliječni proizvodi";
  }

  if (
    ["meso", "piletina", "govedina", "svinjetina", "pršut", "salama"].some(
      (term) => lowerTerm.includes(term),
    )
  ) {
    return "mesni proizvodi";
  }

  if (
    ["jabuke", "banane", "rajčice", "krumpir", "luk", "mrkva"].some((term) =>
      lowerTerm.includes(term),
    )
  ) {
    return "voće i povrće";
  }

  if (
    ["kava", "čaj", "sok", "voda", "pivo", "vino"].some((term) =>
      lowerTerm.includes(term),
    )
  ) {
    return "pića";
  }

  if (
    ["kruh", "pecivo", "kifla", "toast"].some((term) =>
      lowerTerm.includes(term),
    )
  ) {
    return "kruh i pecivo";
  }

  return undefined;
}
