"use client";

import { useEffect, useState } from "react";

export function CurrentDate() {
  const [today, setToday] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toLocaleDateString("hr-HR"));
  }, []);

  return <>{today}</>;
}
