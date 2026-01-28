import { useTranslations } from "next-intl";

export function ProductListEmpty({
  searchedValue,
}: {
  searchedValue?: string;
}) {
  const t = useTranslations("ProductListEmpty");
  const commonT = useTranslations("Common");

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{commonT("noResults")}</h3>
          {searchedValue && (
            <p className="text-muted-foreground mt-2 text-sm">
              {t("noResultsFor", { searchedValue })}
            </p>
          )}
          <p className="text-muted-foreground mt-1 text-sm">
            {t("tryDifferent")}
          </p>
        </div>
      </div>
    </div>
  );
}
