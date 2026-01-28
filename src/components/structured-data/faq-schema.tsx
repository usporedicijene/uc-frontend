import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs.length) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      id="faq-schema"
      type="application/ld+json"
    />
  );
}

// Common FAQs for the homepage
export const homepageFAQs: FAQItem[] = [
  {
    question: "Kako funkcionira usporedba cijena?",
    answer:
      "Naša aplikacija prikuplja aktualне cijene proizvoda iz svih velikih trgovačkih lanaca u Hrvatskoj kao što su Konzum, Kaufland, Lidl, Spar i mnogi drugi. Pretraživanjem proizvoda dobivate pregled svih dostupnih cijena i možete lako pronaći najjeftiniju opciju.",
  },
  {
    question: "Koliko često se ažuriraju cijene?",
    answer:
      "Cijene proizvoda ažuriraju se redovito kako bismo vam pružili najaktualnije informacije. Datum posljednjeg ažuriranja vidljiv je na svakoj stranici s rezultatima pretraživanja.",
  },
  {
    question: "Koje trgovačke lance pokrivate?",
    answer:
      "Pokrivamo sve velike trgovačke lance u Hrvatskoj uključujući Konzum, Kaufland, Lidl, Spar, Plodine, Studenac, DM, Metro, Ribola i mnoge druge. Kontinuirano dodajemo nove trgovine u našu bazu podataka.",
  },
  {
    question: "Je li korištenje aplikacije besplatno?",
    answer:
      "Da, naša aplikacija za usporedbu cijena potpuno je besplatna za korištenje. Ne postoje skrivene naknade ili pretplate. Cilj nam je pomoći potrošačima u Hrvatskoj da pronađu najbolje cijene za svoje kupovine.",
  },
  {
    question: "Mogu li kreirati košaricu i usporediti ukupne cijene?",
    answer:
      "Apsolutno! Možete dodati više proizvoda u svoju košaricu i usporediti ukupne cijene između različitih trgovina. Tako možete pronaći trgovinu koja vam je najisplativija za cijelu kupovinu.",
  },
  {
    question: "Kako mogu pronaći trgovine u mojoj blizini?",
    answer:
      "Možete odabrati svoj grad ili područje pomoću selektora lokacije. Aplikacija će vam prikazati cijene i dostupnost proizvoda u trgovinama na vašem području.",
  },
  {
    question: "Kako mogu kontaktirati podršku?",
    answer:
      "Možete nas kontaktirati putem e-maila na info@usporedicijene.info. Odgovorit ćemo vam u najkraćem mogućem roku.",
  },
];

// FAQs for basket page
export const basketFAQs: FAQItem[] = [
  {
    question: "Kako funkcionira košarica za usporedbu?",
    answer:
      "Dodajte proizvode u košaricu, odaberite trgovine koje vas zanimaju, a mi ćemo vam prikazati ukupne cijene za cijelu košaricu u svakoj trgovini. Tako možete lako vidjeti gdje je vaša kupovina najjeftinija.",
  },
  {
    question: "Mogu li spremiti svoju košaricu?",
    answer:
      "Vaša košarica automatski se sprema lokalno u vašem pregledniku, tako da se neće izgubiti kad zatvorite aplikaciju. Možete se uvijek vratiti i nastaviti s planiranjem kupovine.",
  },
  {
    question: "Što ako proizvod nije dostupan u trgovini?",
    answer:
      "Ako proizvod nije dostupan u određenoj trgovini, to će biti jasno označeno. Usporedba cijena uključuje samo dostupne proizvode, tako da dobivate realnu sliku ukupne cijene košarice.",
  },
];

// FAQs for markets page
export const marketsFAQs: FAQItem[] = [
  {
    question: "Koliko proizvoda pratite po trgovačkom lancu?",
    answer:
      "Broj proizvoda koji pratimo varira ovisno o veličini i asortimanu trgovačkog lanca. Najveći lanci poput Konzuma i Kauflanda imaju desetke tisuća proizvoda u našoj bazi, dok manji lanci mogu imati nekoliko tisuća.",
  },
  {
    question: "Zašto neki trgovački lanci imaju manje proizvoda?",
    answer:
      "Broj proizvoda ovisi o nekoliko faktora: veličini trgovačkog lanca, dostupnosti podataka, asortimanu proizvoda i učestalosti ažuriranja. Kontinuirano radimo na proširivanju ponude za sve trgovine.",
  },
];
