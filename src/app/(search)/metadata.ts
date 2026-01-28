import type { Metadata } from "next";

import {
  BASE_URL,
  COMMON_KEYWORDS,
  createStoreListText,
  getTradingChainsText,
} from "@/lib/seo/metadata-constants";

export const MainPageSearchMetadata: Metadata = {
  title: "Pretraži i usporedi cijene proizvoda",
  description: `Pretraži i usporedi cijene proizvoda u ${getTradingChainsText()} u Hrvatskoj. Pronađi najjeftiniju opciju za tvoju kupovinu u ${createStoreListText()} i drugim trgovinama.`,
  keywords: [
    ...COMMON_KEYWORDS,
    "pretraži proizvode",
    "najjeftiniji proizvodi",
    "kupovina online",
  ],
  alternates: {
    canonical: BASE_URL,
  },
};
