import type { Metadata } from "next";

import { BASE_URL, createStoreListText } from "@/lib/seo/metadata-constants";

export const IndexStatsPageMetadata: Metadata = {
  title:
    "Indeks cijena – Interaktivna karta i statistike promjena cijena u Hrvatskoj",
  description: `Interaktivna karta i analiza promjena cijena proizvoda u Hrvatskoj po gradovima, trgovinama i kategorijama. Prati trendove cijena i prosječne promjene u ${createStoreListText()} i drugim trgovačkim lancima.`,
  keywords: [
    "indeks cijena hrvatska",
    "promjena cijena",
    "statistike cijena",
    "trendovi cijena",
    "inflacija hrvatska",
    "trgovine statistike",
    "promjene cijena po gradovima",
    "prosječne cijene",
    "analiza cijena",
    "karta cijena",
    "interaktivna karta cijena",
    "cijene po gradovima karta",
  ],
  alternates: {
    canonical: `${BASE_URL}/index-stats`,
  },
};
