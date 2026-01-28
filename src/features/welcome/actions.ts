"use server";

import { setWelcomeSeenCookie } from "@/lib/cookies/welcome";

export async function markWelcomeSeenAction(): Promise<void> {
  await setWelcomeSeenCookie("v1");
}
