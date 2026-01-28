import type { Metadata } from "next";

import {
  BASE_URL,
  STORE_KEYWORDS,
  STORE_NAMES,
} from "@/lib/seo/metadata-constants";

export const MarketsPageMetadata: Metadata = {
  title: "Trgovine - Popis svih trgovačkih lanaca u Hrvatskoj",
  description: `Kompletan popis trgovačkih lanaca u Hrvatskoj s brojem dostupnih proizvoda. Saznaj koliko proizvoda prati svaki lanac: ${STORE_NAMES.join(", ")} i mnogi drugi.`,
  keywords: [
    "trgovački lanci hrvatska",
    "popis trgovina",
    ...STORE_KEYWORDS,
    "trgovine statistike",
    "broj proizvoda trgovine",
  ],
  alternates: {
    canonical: `${BASE_URL}/markets`,
  },
};
