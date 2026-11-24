import { useEffect, type RefObject } from "react";

/** Le contenu reste lisible sans JavaScript. Seules les sections hors écran attendent leur animation. */
export default function useHomeMotion(root: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const page = root.current;
    if (!page || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = page.querySelector<HTMLElement>(".home-hero");
    const items = Array.from(page.querySelectorAll<HTMLElement>(
      ".home-facts > p, .section-heading, .work-preview, .home-services-header, .service-tile",
    ));
    let heroVisible = true;
    let observer: IntersectionObserver | undefined;

    const updatePlayback = () => {
      page.dataset.homeMotion = !preference.matches && heroVisible && !document.hidden ? "running" : "paused";
    };
    const reveal = (element: HTMLElement) => {
      element.dataset.homeReveal = "visible";
      observer?.unobserve(element);
    };
    const configure = () => {
      observer?.disconnect();
      items.forEach((item) => item.removeAttribute("data-home-reveal"));
      updatePlayback();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) {
            heroVisible = entry.isIntersecting;
            updatePlayback();
          } else if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });
      if (hero) observer.observe(hero);
      items.forEach((item) => {
        // Une section déjà visible doit le rester, y compris après la restauration du défilement.
        if (item.getBoundingClientRect().top >= window.innerHeight) {
          item.dataset.homeReveal = "pending";
          observer?.observe(item);
        }
      });
    };
    const showFocusedItem = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-home-reveal]") : null;
      if (target) reveal(target);
    };
    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("visibilitychange", updatePlayback);
    page.addEventListener("focusin", showFocusedItem);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", updatePlayback);
      page.removeEventListener("focusin", showFocusedItem);
      items.forEach((item) => item.removeAttribute("data-home-reveal"));
      page.removeAttribute("data-home-motion");
    };
  }, [root]);
}
