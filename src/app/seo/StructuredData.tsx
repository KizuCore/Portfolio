import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { updateStructuredData } from "./structuredDataDom";

export default function StructuredData({ json }: { json: string | null }) {
  useEffect(() => updateStructuredData(document, json), [json]);

  // Le serveur place le graphe dans l’en-tête du document. Dans le navigateur,
  // une affectation via innerHTML ferait perdre la protection de TrustedScript.
  return typeof document === "undefined" && json !== null
    ? <Helmet><script id="seo-structured-data" type="application/ld+json">{json}</script></Helmet>
    : null;
}
