import { Spinner } from "@/components/ui/spinner";

export function ProductSearchLoading() {
  return (
    <div className="flex w-full animate-[fadeIn_75ms_200ms_forwards] items-center justify-center py-10 opacity-0">
      <Spinner size={32} />
    </div>
  );
}
