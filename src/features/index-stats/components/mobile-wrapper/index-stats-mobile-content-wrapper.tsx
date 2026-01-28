"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { IndexStatsMobileViewToggle } from "./index-stats-mobile-view-toggle";

interface IndexStatsMobileContentWrapperProps {
  mobileView: "table" | "map";
  tableContent: React.ReactNode;
  mapContent: React.ReactNode;
}

export function IndexStatsMobileContentWrapper({
  mapContent,
  mobileView,
  tableContent,
}: IndexStatsMobileContentWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewChange = useCallback(
    (newView: "table" | "map") => {
      const params = new URLSearchParams(searchParams);
      params.set("mobileView", newView);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* Mobile View Toggle - Only visible on mobile */}
      <div className="flex justify-center lg:hidden">
        <IndexStatsMobileViewToggle
          currentView={mobileView}
          onViewChange={handleViewChange}
        />
      </div>

      {/* Content Section - Map first, then table below */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Map Section */}
        <div
          className={`flex flex-col ${mobileView === "map" ? "block" : "hidden"} lg:block`}
        >
          {mapContent}
        </div>

        {/* Table Section */}
        <div
          className={`flex ${mobileView === "table" ? "block" : "hidden"} lg:block`}
        >
          <div className="w-full">{tableContent}</div>
        </div>
      </div>
    </div>
  );
}
