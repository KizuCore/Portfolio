import { useEffect, type MutableRefObject } from "react";

// Mounted inside the route's Suspense/animation boundary: the heading is ready,
// and the previous page has left before focus moves to the new content.
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
