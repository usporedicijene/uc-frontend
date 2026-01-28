import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}
