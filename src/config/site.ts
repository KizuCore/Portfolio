export {
  EDUCATION_ORGANIZATIONS,
  FREELANCE_OFFER,
  PROFESSIONAL_TOPICS,
  SITE_PROFILE,
  SOCIAL_LINKS,
} from "../data/portfolio";

import { SITE_PROFILE } from "../data/portfolio";

// Return the canonical production origin used by SEO metadata and generated assets.
export function getSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
}

// Return the absolute preview image URL for OpenGraph, Twitter Cards, and JSON-LD.
export function getPreviewImageUrl(siteUrl = getSiteUrl()): string {
  return `${siteUrl}${SITE_PROFILE.previewImagePath}`;
}
