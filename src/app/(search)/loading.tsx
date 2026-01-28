import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full animate-[fadeIn_75ms_200ms_forwards] items-center justify-center opacity-0">
      <Spinner size={32} />
    </div>
  );
}
