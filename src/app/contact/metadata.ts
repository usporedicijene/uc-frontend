import type { Metadata } from "next";

import { BASE_URL } from "@/lib/seo/metadata-constants";

export const metadata: Metadata = {
  title: "Kontakt - Usporedi cijene",
  description:
    "Kontaktirajte tim Usporedi cijene putem emaila, Reddit zajednice ili GitHub Issuesa za komentare, prijedloge i prijavu grešaka.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  robots: {
    index: true,
    follow: false,
  },
};
