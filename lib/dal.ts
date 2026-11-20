// Lab-only mock session store. Replace this with verified server sessions in production.
export interface Session {
  userId: string;
}

let _mockCookieValue: string | undefined = undefined;

// Test helpers let the demo switch identities without an auth provider.
export function _setMockCookie(value: string | undefined): void {
  _mockCookieValue = value;
}

export function _getMockCookie(): string | undefined {
  return _mockCookieValue;
}

// Resolve the current lab identity; unauthenticated requests return null.
export async function verifySession(): Promise<Session | null> {
  const token = _getMockCookie();

  if (!token || !token.startsWith("token-")) return null;

  const userId = token.slice("token-".length);
  if (!userId) return null;

  return { userId };
}
