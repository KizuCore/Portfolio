export const SITE_PROFILE = {
  brandName: "KizuCore",
  displayName: "Théo Guérin",
  jobTitle: "Développeur Full-Stack",
  email: "theo.guerin35000@gmail.com",
  city: "Rennes",
  postalCode: "35700",
  countryCode: "FR",
  regionCode: "FR-35",
  geoPosition: "48.117266;-1.677793",
  geoICBM: "48.117266, -1.677793",
  twitterHandle: "@KizuCore",
  previewImagePath: "/images/preview/previewsite.png",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/KizuCore",
  gitlab: "https://gitlab.com/Theo35000",
  linkedin: "https://www.linkedin.com/in/theo-guerin35/",
} as const;

export const EDUCATION_ORGANIZATIONS = [
  "Université Rennes 1 ISTIC",
  "My Digital School Rennes",
] as const;

export const PROFESSIONAL_TOPICS = [
  "React",
  "Django",
  "Python",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "TypeScript",
] as const;

export const FREELANCE_OFFER = {
  dayRateFrom: 300,
  currency: "EUR",
  taxLabel: "HT",
  unitText: "DAY",
} as const;

export function getSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "https://theo-guerin.fr").replace(/\/+$/, "");
}

export function getPreviewImageUrl(siteUrl = getSiteUrl()): string {
  return `${siteUrl}${SITE_PROFILE.previewImagePath}`;
}
