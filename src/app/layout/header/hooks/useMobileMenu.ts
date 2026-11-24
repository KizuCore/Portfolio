import { useEffect, useRef, useState } from "react";

const MENU_FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useMobileMenu(pathname: string) {
  const [expand, setExpand] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Ferme le menu mobile après une navigation, y compris avec les boutons précédent et suivant du navigateur.
    setExpand(false);
  }, [pathname]);

  useEffect(() => {
    if (!expand) {
      return;
    }
    const menu = menuRef.current;
    const nav = navRef.current;
    const toggleButton = toggleButtonRef.current;

    const getFocusableMenuItems = () =>
      Array.from(navRef.current?.querySelectorAll<HTMLElement>(MENU_FOCUSABLE_SELECTOR) ?? []).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1 && element.getClientRects().length > 0
      );

    // Maintient le focus dans le menu mobile ouvert jusqu’à sa fermeture.
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpand(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableItems = getFocusableMenuItems();
      if (focusableItems.length === 0) {
        return;
      }

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 900px)");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnDesktop = () => { if (desktop.matches) setExpand(false); };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setExpand(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleMenuKeyDown);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    const frame = window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleMenuKeyDown);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
      // Un lien vers la page déjà affichée doit aussi refermer le menu.
      if (menu?.contains(document.activeElement)) {
        const target = desktop.matches
          ? nav?.querySelector<HTMLElement>("a[href]")
          : toggleButton;
        target?.focus();
      }
    };
  }, [expand]);

  return { expand, setExpand, navRef, menuRef, toggleButtonRef };
}
