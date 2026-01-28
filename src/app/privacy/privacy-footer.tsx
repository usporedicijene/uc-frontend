"use client";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

export function PrivacyFooter() {
  const [year, setYear] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className="text-center">
      <Separator className="mb-6" />
      <p className="text-muted-foreground text-sm">
        © {year} Usporedi cijene. Sva prava pridržana.
      </p>
    </div>
  );
}
