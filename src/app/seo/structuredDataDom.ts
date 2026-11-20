type JsonLdPolicy = { createScript: (input: string) => unknown };
type TrustedTypesFactory = {
  createPolicy: (name: string, rules: { createScript: (input: string) => string }) => JsonLdPolicy;
};

const policies = new WeakMap<TrustedTypesFactory, JsonLdPolicy>();
const scriptId = "seo-structured-data";

// Only JSON data is accepted: never grant trust to arbitrary JavaScript or HTML.
function validateJsonLd(input: string): string {
  const value = JSON.parse(input);
  if (!value || Array.isArray(value) || value["@context"] !== "https://schema.org" || !Array.isArray(value["@graph"])) {
    throw new TypeError("Expected a schema.org JSON-LD graph");
  }
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function serializeStructuredData(value: unknown): string {
  return validateJsonLd(JSON.stringify(value));
}

export function updateStructuredData(document: Document, json: string | null): () => void {
  const previous = document.head.querySelectorAll(
    `script#${scriptId}, script[type="application/ld+json"][data-rh="true"]`,
  );
  if (json === null) {
    previous.forEach(script => script.remove());
    return () => {};
  }

  const validated = validateJsonLd(json);
  const factory = (document.defaultView as (Window & { trustedTypes?: TrustedTypesFactory }) | null)?.trustedTypes;
  let content: unknown = validated;
  if (factory) {
    let policy = policies.get(factory);
    if (!policy) {
      policy = factory.createPolicy("portfolio-json-ld", { createScript: validateJsonLd });
      policies.set(factory, policy);
    }
    content = policy.createScript(validated);
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  // TS 5.7 only declares string here; the runtime must receive the TrustedScript object.
  script.text = content as string;
  previous.forEach(element => element.remove());
  document.head.appendChild(script);
  return () => script.remove();
}
