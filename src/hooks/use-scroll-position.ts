import { useCallback, useEffect, useRef } from "react";

import { getScrollPosition, saveScrollPosition } from "@/lib/scroll-position";

interface UseScrollPositionManagerOptions {
  isActive: boolean;
  contentSelector?: string;
  maxRetries?: number;
  retryDelay?: number;
  initialDelay?: number;
}

export function useScrollPosition({
  contentSelector = ".flex.flex-col.items-center",
  initialDelay = 0,
  isActive,
  maxRetries = 40,
  retryDelay = 50,
}: UseScrollPositionManagerOptions) {
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollElementRef.current) {
      const scrollTop = scrollElementRef.current.scrollTop;
      saveScrollPosition(scrollTop);
    }
  }, []);

  // Restore scroll position when becomes active and content is loaded
  useEffect(() => {
    if (!isActive || !scrollElementRef.current) return;

    const savedPosition = getScrollPosition();
    if (savedPosition <= 0) return;

    let retryCount = 0;

    const restoreScrollPosition = () => {
      if (!scrollElementRef.current || retryCount >= maxRetries) return;

      // Check if content has been rendered
      const contentContainer = scrollElementRef.current.querySelector(
        contentSelector,
      ) as HTMLElement;
      const hasContent =
        contentContainer &&
        contentContainer.children.length > 0 &&
        contentContainer.offsetHeight > 100;

      if (hasContent) {
        // Use requestAnimationFrame to ensure layout is complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (scrollElementRef.current) {
              scrollElementRef.current.scrollTop = savedPosition;
            }
          });
        });
      } else {
        // If content isn't ready yet, try again
        retryCount++;
        setTimeout(restoreScrollPosition, retryDelay);
      }
    };

    // Start checking for content after initial delay
    setTimeout(restoreScrollPosition, initialDelay);
  }, [isActive, contentSelector, maxRetries, retryDelay, initialDelay]);

  // Add scroll listener
  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (isActive && scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isActive, handleScroll]);

  // Save scroll position when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive && scrollElementRef.current) {
        const scrollTop = scrollElementRef.current.scrollTop;
        saveScrollPosition(scrollTop);
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        isActive &&
        scrollElementRef.current
      ) {
        const scrollTop = scrollElementRef.current.scrollTop;
        saveScrollPosition(scrollTop);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  return {
    scrollElementRef,
  };
}
