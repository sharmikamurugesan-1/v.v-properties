"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

export function getConsentState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("vv_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

export function setConsentState(accepted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("vv_cookie_consent", accepted ? "accepted" : "declined");
  } catch {
    // ignore
  }
}

export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  if (!getConsentState()) return;

  // Google Analytics 4 event push
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag("event", eventName, params);
  }

  // Meta Pixel event push
  if (typeof (window as unknown as { fbq?: Function }).fbq === "function") {
    (window as unknown as { fbq: Function }).fbq("trackCustom", eventName, params);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event: ${eventName}]`, params);
  }
}
