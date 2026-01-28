import { Suspense } from "react";

import { WelcomeModal } from "@/components/welcome-modal";
import { getWelcomeSeenCookie } from "@/lib/cookies/welcome";

async function WelcomeModalContent() {
  const welcomeSeen = await getWelcomeSeenCookie();
  const shouldShowWelcome = welcomeSeen !== "v1";

  return <WelcomeModal initialOpen={shouldShowWelcome} />;
}

export function WelcomeModalWrapper() {
  return (
    <Suspense fallback={null}>
      <WelcomeModalContent />
    </Suspense>
  );
}
