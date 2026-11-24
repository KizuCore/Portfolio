import { useEffect, type MutableRefObject } from "react";

// Ce composant attend le chargement de la nouvelle page et la fin de la transition.
// Le focus peut alors rejoindre son titre.
export default function RouteFocus({ pathname, previousPath }: {
  pathname: string;
  previousPath: MutableRefObject<string>;
}) {
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const main = document.getElementById("main-content");
    const target = main?.querySelector<HTMLElement>(".route-stage h1") ?? main;
    if (!target) return;
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }, [pathname, previousPath]);

  return null;
}
