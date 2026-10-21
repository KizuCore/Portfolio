import type { StackIconName } from "../StackIcon";

export type SkillLevel = 0 | 1 | 2;
export type SkillCategory = "Programming Languages" | "Front-End" | "Back-End" | "Database" | "Hosting" | "Mobile" | "CMS";
export type SkillFilter = SkillCategory | "All";


export interface TechSkill {
  icon: StackIconName;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  favorite?: boolean;
}

export const TECH_CATEGORIES: SkillFilter[] = [
  "All",
  "Programming Languages",
  "Front-End",
  "Back-End",
  "Database",
  "Hosting",
  "Mobile",
  "CMS",
];

export const TECH_SKILLS: TechSkill[] = [
  { icon: "SiFlutter", name: "Flutter", level: 2, category: "Mobile", favorite: true },
  { icon: "DiReact", name: "React", level: 2, category: "Front-End", favorite: true },
  { icon: "DiNodejs", name: "Node.js", level: 2, category: "Back-End", favorite: true },
  { icon: "SiTailwindcss", name: "Tailwind", level: 2, category: "Front-End" },
  { icon: "DiMysql", name: "MySQL", level: 2, category: "Database" },
  { icon: "SiBootstrap", name: "Bootstrap", level: 2, category: "Front-End" },
  { icon: "SiCss3", name: "CSS", level: 2, category: "Front-End" },
  { icon: "FaJava", name: "Java", level: 1, category: "Programming Languages" },
  { icon: "DiJavascript1", name: "JavaScript", level: 1, category: "Programming Languages" },
  { icon: "SiTypescript", name: "TypeScript", level: 2, category: "Programming Languages", favorite: true },
  { icon: "SiHtml5", name: "HTML", level: 2, category: "Front-End" },
  { icon: "DiPython", name: "Python", level: 2, category: "Programming Languages", favorite: true },
  { icon: "DiPhp", name: "PHP", level: 1, category: "Programming Languages" },
  { icon: "DiScala", name: "Scala", level: 1, category: "Programming Languages" },
  { icon: "FaCheck", name: "Why3", level: 1, category: "Programming Languages" },
  { icon: "DiWordpress", name: "Wordpress - CMS", level: 2, category: "CMS" },
  { icon: "FaWix", name: "Wix - CMS", level: 2, category: "CMS" },
  { icon: "FaVuejs", name: "Vue.js", level: 1, category: "Front-End" },
  { icon: "FaCloud", name: "Vercel", level: 2, category: "Hosting" },
  { icon: "SiNginx", name: "Nginx", level: 2, category: "Hosting" },
  { icon: "SiGnubash", name: "Bash", level: 1, category: "Programming Languages" },
  { icon: "DiDjango", name: "Django", level: 2, category: "Back-End", favorite: true },
  { icon: "SiPostgresql", name: "PostgreSQL", level: 2, category: "Database" },
  { icon: "SiMariadb", name: "MariaDB", level: 0, category: "Database" },
  { icon: "FaFileExcel", name: "VBA", level: 1, category: "Programming Languages" },
  { icon: "SiAngular", name: "Angular", level: 1, category: "Front-End" },
  { icon: "SiNetlify", name: "Netlify", level: 1, category: "Hosting" },
  { icon: "FaAws", name: "AWS", level: 1, category: "Hosting" },
  { icon: "SiNuxtDotJs", name: "Nuxt", level: 1, category: "Front-End" },
  { icon: "SiCplusplus", name: "C++", level: 1, category: "Programming Languages" },
  { icon: "SiKotlin", name: "Kotlin", level: 1, category: "Mobile" },
  { icon: "SiFlask", name: "Flask", level: 2, category: "Back-End" },
  { icon: "SiHeroku", name: "Heroku", level: 0, category: "Hosting" },
  { icon: "SiGraphql", name: "GraphQL", level: 0, category: "Back-End" },
  { icon: "SiRust", name: "Rust", level: 0, category: "Back-End" },
  { icon: "SiLaravel", name: "Laravel", level: 0, category: "Back-End" },
  { icon: "DiNodejs", name: "Next.js", level: 1, category: "Back-End" },
  { icon: "SiSwift", name: "Swift", level: 0, category: "Mobile" },
];
