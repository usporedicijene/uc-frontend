const SCROLL_POSITION_KEY = "searchScrollPosition";

export function saveScrollPosition(position: number): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SCROLL_POSITION_KEY, position.toString());
  }
}

export function getScrollPosition(): number {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
    return saved ? parseInt(saved, 10) : 0;
  }
  return 0;
}

export function clearScrollPosition(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  }
}
