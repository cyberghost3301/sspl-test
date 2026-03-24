/**
 * Shared analytics helpers for Spirecrest
 * ─────────────────────────────────────────
 * Uses window.gtag gracefully — no-ops when GA is absent or during SSR.
 */

/* ── Type-safe gtag extension on Window ── */
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Fires a `whatsapp_click` GA4 event.
 *
 * @param ctaLabel   - Human-readable label of the button clicked (e.g., "Build Something Similar")
 * @param sectionName - Logical section identifier (e.g., "hero", "case_study", "floating_widget")
 */
export function trackWhatsAppClick(ctaLabel: string, sectionName: string): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "whatsapp_click", {
      page: window.location.pathname,
      cta: ctaLabel,
      section: sectionName,
    });
  }
}
