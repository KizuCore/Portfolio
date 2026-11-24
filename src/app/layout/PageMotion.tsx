import { useEffect, useRef, type ReactNode } from "react";

// L’animation cible les blocs de contenu pour garder la navigation, les fenêtres de dialogue et les champs immobiles.
const REVEAL_TARGETS = [
  ".about-section-title", ".tech-icons", ".tech-icons-1", ".code-activity-card",
  ".project-card-view", ".career-section-heading", ".timeline-event",
  ".resume-work-card", ".resume-project-card", ".resume-education-list > li",
  ".resume-skills", ".resume-connect", ".resume-document", ".contact-aside",
  ".business-section", ".business-faq", ".business-related > h2", ".business-related-grid > a",
  ".business-contact", ".business-overview > div", ".case-section",
  ".showcase-journey > li", ".showcase-section-heading", ".showcase-technical-item",
  ".business-gallery-heading", ".business-gallery-grid > figure", ".legal-info-box > section",
].join(", ");

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const page = root.current;
    // Ces scènes gèrent déjà leurs propres animations.
    if (!page || page.querySelector(".home-page, .gojo-route, .arcane-route") || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Set<HTMLElement>();
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const reveal = (element: HTMLElement) => {
      element.dataset.pageReveal = "visible";
      observer?.unobserve(element);
    };
    const scan = () => {
      frame = 0;
      for (const item of tracked) {
        if (!page.contains(item)) { observer?.unobserve(item); tracked.delete(item); }
      }
      if (preference.matches) return;
      page.querySelectorAll<HTMLElement>(REVEAL_TARGETS).forEach((item) => {
        if (tracked.has(item) || item.closest("[hidden], [aria-hidden='true']") || !item.getClientRects().length) return;
        // Un bloc imbriqué bénéficie déjà de l’animation de son parent.
        if (item.parentElement?.closest(REVEAL_TARGETS)) return;
        tracked.add(item);
        if (item.getBoundingClientRect().top >= window.innerHeight) {
          item.dataset.pageReveal = "pending";
          observer?.observe(item);
        }
      });
    };
    const configure = () => {
      observer?.disconnect();
      tracked.forEach((item) => item.removeAttribute("data-page-reveal"));
      tracked.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
      }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });
      scan();
    };
    const showFocusedItem = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-page-reveal]") : null;
      if (target) reveal(target);
    };
    configure();
    // Les filtres et le chargement différé peuvent ajouter des cartes après le premier affichage.
    const mutations = new MutationObserver(() => { if (!frame) frame = requestAnimationFrame(scan); });
    mutations.observe(page, { childList: true, subtree: true });
    preference.addEventListener("change", configure);
    page.addEventListener("focusin", showFocusedItem);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      page.removeEventListener("focusin", showFocusedItem);
      tracked.forEach((item) => item.removeAttribute("data-page-reveal"));
    };
  }, []);
  return <div className="page-motion-scope" ref={root}>{children}</div>;
}
