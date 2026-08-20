export {
  EDUCATION_ORGANIZATIONS,
  FREELANCE_OFFER,
  PROFESSIONAL_TOPICS,
  SITE_PROFILE,
  SOCIAL_LINKS,
} from "../data/portfolio";

import { SITE_PROFILE } from "../data/portfolio";

export function getSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
}

export function getPreviewImageUrl(siteUrl = getSiteUrl()): string {
  return `${siteUrl}${SITE_PROFILE.previewImagePath}`;
}
