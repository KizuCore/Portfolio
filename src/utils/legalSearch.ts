export function normalizeLegalText(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function matchesLegalSearch(text: string, query: string): boolean {
  const normalized = normalizeLegalText(text);
  return normalizeLegalText(query).trim().split(/\s+/).every((word) => normalized.includes(word));
}
