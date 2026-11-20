"use server";

import { _setMockCookie } from "@/lib/dal";
import { revalidatePath } from "next/cache";

// Local-only identity switch for testing resource ownership.
export async function useDemoUser(userId: "user-alice" | "user-bob") {
  _setMockCookie(`token-${userId}`);
  revalidatePath("/");
}

export async function clearDemoSession() {
  _setMockCookie(undefined);
  revalidatePath("/");
}
