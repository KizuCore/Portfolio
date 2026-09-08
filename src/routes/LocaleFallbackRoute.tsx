import { Navigate, useLocation } from "react-router-dom";
import { SUPPORTED_LOCALES } from "../config/seo";

export default function LocaleFallbackRoute() {
  const { pathname } = useLocation();
  const [, firstSegment] = pathname.split("/");
  const locale = SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number]) ? firstSegment : "fr";
  return <Navigate to={`/${locale}`} replace />;
}
