export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  try {
    return new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return String(value);
  }
}
