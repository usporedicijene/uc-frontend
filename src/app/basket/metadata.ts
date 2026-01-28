import type { Metadata } from "next";

import {
  BASE_URL,
  COMMON_KEYWORDS,
  createStoreListText,
} from "@/lib/seo/metadata-constants";

export const BasketPageMetadata: Metadata = {
  title: "Košarica - Usporedi ukupne cijene za više proizvoda",
  description: `Stvori svoju košaricu s proizvodima i usporedi ukupne cijene u različitim trgovinama. Pronađi trgovinu s najjeftinijom košaricom za sve tvoje potrebe u ${createStoreListText()} i drugim lancima.`,
  keywords: [
    "košarica proizvoda",
    "usporedi ukupne cijene",
    "ukupna cijena košarice",
    "najbolja trgovina",
    ...COMMON_KEYWORDS,
    "usporedba košarica",
    "ukupna kupovina",
    "najjeftinija košarica",
  ],
  alternates: {
    canonical: `${BASE_URL}/basket`,
  },
};
