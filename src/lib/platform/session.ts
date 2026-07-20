import { adminAuth } from "@/lib/firebase/server";

export const SESSION_COOKIE_NAME = "celeriflow_session";
export const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

export type SessionPrincipal = {
  firebaseUid: string;
};

export async function createSession(idToken: string) {
  return adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
}

export async function getSessionPrincipal(sessionCookie: string | undefined): Promise<SessionPrincipal | null> {
  if (!sessionCookie) return null;

  try {
    const token = await adminAuth.verifySessionCookie(sessionCookie, true);
    return { firebaseUid: token.uid };
  } catch {
    return null;
  }
}
