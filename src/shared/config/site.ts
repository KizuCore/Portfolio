export { EDUCATION_ORGANIZATIONS, FREELANCE_OFFER, PROFESSIONAL_TOPICS, SITE_PROFILE, SOCIAL_LINKS } from "@/content/profile";

import { SITE_PROFILE } from "@/content/profile";

// Renvoie l’origine canonique de production utilisée par les métadonnées SEO et les ressources générées.
export function getSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
}

// Renvoie l’URL absolue de l’image d’aperçu pour OpenGraph, Twitter Cards et JSON-LD.
export function getPreviewImageUrl(siteUrl = getSiteUrl()): string {
  return `${siteUrl}${SITE_PROFILE.previewImagePath}`;
}
