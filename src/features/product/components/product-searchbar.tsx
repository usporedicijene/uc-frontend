"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import clsx from "clsx";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SplitText } from "@/components/split-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { saveSearchQueryAction } from "@/features/product/actions";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { clearScrollPosition } from "@/lib/scroll-position";

import { ProductBarcodeScannerDialog } from "./product-barcode-dialog";

interface ProductSearchBarProps {
  cityChooser: ReactNode;
  children: ReactNode;
  priceInfo: ReactNode;
  newsSection: ReactNode;
}

export function ProductSearchBar({
  children,
  cityChooser,
  newsSection,
  priceInfo,
}: ProductSearchBarProps) {
  const t = useTranslations("ProductSearchbar");
  const tHome = useTranslations("HomePage");
  const tCommon = useTranslations("Common");

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const initialQueryFromUrl = searchParams.get("value") || "";

  const [query, setQuery] = useState(initialQueryFromUrl);
  const [searchActive, setSearchActive] = useState(
    initialQueryFromUrl.length > 0,
  );
  const [error, setError] = useState<string | null>(null);
  const [titleStartDelay, setTitleStartDelay] = useState(0);

  const [isPending, startTransition] = useTransition();

  const { scrollElementRef } = useScrollPosition({
    isActive: searchActive,
  });

  // Sync component state with URL params (browser back/forward navigation)
  /* eslint-disable */
  useEffect(() => {
    if (initialQueryFromUrl) {
      setSearchActive(initialQueryFromUrl.length > 0);
      setQuery(initialQueryFromUrl);
      setError(null);
    } else {
      setSearchActive(false);
      setQuery("");
    }
  }, [initialQueryFromUrl]);
  /* eslint-enable */

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query?.trim();

    if (!trimmed || trimmed.length < 3) {
      setError(t("errorTooShort"));
      return;
    }

    setSearchActive(true);
    setError(null);

    // Store search term in history and navigate
    startTransition(async () => {
      await saveSearchQueryAction(trimmed);
      const encoded = encodeURIComponent(trimmed);
      router.push(`/?value=${encoded}`);
    });

    // Hide mobile keyboard after confirming search
    inputRef.current?.blur();
  };

  const handleBack = () => {
    setQuery("");
    setSearchActive(false);
    setError(null);
    clearScrollPosition();
    // when returning to inactive state, slow down title animation
    setTitleStartDelay(150);
    router.push("/");
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <header
        className={clsx(
          "shrink-0 transition-all duration-300 ease-in-out",
          searchActive
            ? "bg-background fixed top-[56px] right-0 left-0 z-20 translate-y-0 border-b pb-3 md:sticky md:top-0 md:right-auto md:left-auto md:border-0 md:shadow-none"
            : "mt-[8dvh] md:mt-[16dvh]",
        )}
      >
        <div
          className={clsx(
            "mx-auto flex w-full max-w-5xl flex-col items-center px-5 md:px-6",
            searchActive
              ? "gap-4 md:mt-6"
              : "h-full justify-center gap-5 md:gap-6",
          )}
        >
          {!searchActive && (
            <SplitText
              className="text-primary relative mx-auto mt-6 cursor-pointer text-center text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
              delay={40}
              duration={0.3}
              startDelay={titleStartDelay}
              text={tHome("title")}
            />
          )}

          <form
            className="flex w-full flex-col items-center gap-3"
            onSubmit={handleSearch}
          >
            <div className="relative w-full">
              <Input
                className={clsx(
                  "h-12 rounded-full pr-[9rem] text-sm sm:pr-[18rem] md:h-16 md:pr-[12rem]",
                  searchActive ? "pl-11 md:pl-14" : "pl-6",
                )}
                name="value"
                placeholder={t("inputPlaceholder")}
                ref={inputRef}
                required
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (error) setError(null);
                }}
              />

              {searchActive && (
                <Button
                  className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full md:left-4"
                  size="icon"
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                >
                  <ArrowLeftIcon className="size-5 md:size-6" />
                </Button>
              )}
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 md:gap-4">
                <ProductBarcodeScannerDialog />
                <Button className="h-8 rounded-full px-6 md:h-11" type="submit">
                  {tCommon("search")}
                </Button>
              </div>
            </div>

            <div className="hidden w-full justify-center gap-2 not-first-of-type:items-center md:flex md:justify-between">
              <div className="flex">{priceInfo}</div>
              <div className="flex items-center gap-2">
                <span className="text-foreground/80 text-sm">
                  {tCommon("searchInArea")}
                </span>
                {cityChooser}
              </div>
            </div>

            {error && (
              <span className="text-destructive mt-2 block w-full text-sm">
                {error}
              </span>
            )}
          </form>
        </div>
      </header>

      {isPending && (
        <div className="flex w-full animate-[fadeIn_75ms_200ms_forwards] items-center justify-center py-10 pt-24 opacity-0 md:pt-10">
          <Spinner size={32} />
        </div>
      )}

      {searchActive && !isPending && (
        <div className="flex min-h-0 w-full flex-1 flex-col pt-[69px] md:pt-0">
          <ScrollArea className="h-full w-full" viewportRef={scrollElementRef}>
            <div className="flex flex-col items-center px-6 py-4">
              {children}
            </div>
          </ScrollArea>
        </div>
      )}

      {!searchActive && !isPending && (
        <div className="flex min-h-0 w-full flex-1 flex-col items-center pt-6">
          <ScrollArea className="h-full w-full max-w-4xl">
            <div className="flex w-full flex-col items-center px-6 pt-6 pb-6">
              {newsSection}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
