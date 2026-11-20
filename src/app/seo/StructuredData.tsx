import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { updateStructuredData } from "./structuredDataDom";

export default function StructuredData({ json }: { json: string | null }) {
  useEffect(() => updateStructuredData(document, json), [json]);

  // Server rendering still exposes the graph in the head. In the browser, Helmet
  // must never assign it through innerHTML, which would discard TrustedScript.
  return typeof document === "undefined" && json !== null
    ? <Helmet><script id="seo-structured-data" type="application/ld+json">{json}</script></Helmet>
    : null;
}
