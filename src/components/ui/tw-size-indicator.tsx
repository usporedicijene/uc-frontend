export function TwSizeIndicator() {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="bg-background text-foreground fixed top-0 left-0 z-50 flex w-8 items-center justify-center py-1 text-xs font-bold uppercase">
        <span className="block sm:hidden">xs</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="3xl:hidden hidden 2xl:block">2xl</span>
      </div>
    );
  }

  return null;
}
