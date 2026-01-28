"use server";

import { revalidatePath } from "next/cache";

import { setCityIdCookie } from "@/lib/cookies/city";

export async function setCityAction(cityId: string): Promise<void> {
  await setCityIdCookie(cityId);
  revalidatePath("/");
}
