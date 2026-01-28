import type { Metadata } from "next";

import { BASE_URL } from "@/lib/seo/metadata-constants";

export const metadata: Metadata = {
  title: "Politika privatnosti - Zaštita vaših podataka",
  description:
    "Politika privatnosti za Usporedi cijene aplikaciju. Informacije o tome kako prikupljamo, koristimo i štitimo vaše podatke te o vašim pravima vezano uz privatnost.",
  keywords: [
    "politika privatnosti",
    "zaštita podataka",
    "privatnost korisnika",
    "GDPR",
    "sigurnost podataka",
    "kolačići",
    "tehnički podaci",
    "usporedi cijene privatnost",
  ],
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: false,
  },
};
