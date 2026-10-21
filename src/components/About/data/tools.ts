import type { StackIconName } from "../StackIcon";

export interface ToolItem {
  icon: StackIconName;
  name: string;
  category: string;
}

export const TOOLS: ToolItem[] = [
  { icon: "FaWindows", name: "Windows", category: "OS" },
  { icon: "SiLinux", name: "Linux", category: "OS" },
  { icon: "VscFileCode", name: "Visual Studio Code", category: "IDE" },
  { icon: "VscFileCode", name: "IntelliJ IDEA", category: "IDE" },
  { icon: "SiAndroidstudio", name: "Android Studio", category: "IDE" },
  { icon: "SiPostman", name: "Postman", category: "API" },
  { icon: "FaExchangeAlt", name: "WooCommerce API", category: "API" },
  { icon: "FaExchangeAlt", name: "Stripe", category: "API" },
  { icon: "FaExchangeAlt", name: "Systempay", category: "API" },
  { icon: "VscFileCode", name: "WeasyPrint", category: "API" },
  { icon: "FaExchangeAlt", name: "Capacitor", category: "API" },
  { icon: "FaPaperPlane", name: "LimeSurvey", category: "API" },
  { icon: "SiGit", name: "Git", category: "Version Control" },
  { icon: "SiGithub", name: "GitHub", category: "Version Control" },
  { icon: "SiGitlab", name: "GitLab", category: "Version Control" },
  { icon: "SiGitlab", name: "GitLab Runner", category: "DevOps" },
  { icon: "SiGitlab", name: "GitLab CI/CD", category: "DevOps" },
  { icon: "DiMysql", name: "phpMyAdmin", category: "Database" },
  { icon: "FaDatabase", name: "MAMP / LAMP / XAMP", category: "Database" },
  { icon: "FaNetworkWired", name: "Wireshark", category: "Networking" },
  { icon: "SiAmazonaws", name: "AWS", category: "Cloud" },
  { icon: "FaCloud", name: "OVH", category: "Cloud" },
  { icon: "FaCloud", name: "Vercel", category: "Cloud" },
  { icon: "AiOutlineFileExcel", name: "Excel", category: "Productivity" },
  { icon: "AiOutlineFileExcel", name: "Pack Office", category: "Productivity" },
  { icon: "FaExchangeAlt", name: "Axios", category: "API" },
  { icon: "FaCogs", name: "City API", category: "API" },
  { icon: "FaPaperPlane", name: "Brevo", category: "Communication" },
  { icon: "SiDocker", name: "Docker", category: "DevOps" },
  { icon: "FaNetworkWired", name: "Nginx", category: "DevOps" },
  { icon: "FaNetworkWired", name: "Traefik", category: "DevOps" },
  { icon: "FaCogs", name: "Kubernetes", category: "DevOps" },
  { icon: "FaCogs", name: "Unity", category: "DevOps" },
  { icon: "SiAdobephotoshop", name: "Adobe Photoshop", category: "Design" },
  { icon: "SiFigma", name: "Figma", category: "Design" },
  { icon: "SiAdobepremiere", name: "Adobe Premiere Pro", category: "Design" },
  { icon: "SiJira", name: "Jira", category: "Project Management" },
  { icon: "SiTrello", name: "Trello", category: "Project Management" },
  { icon: "SiJenkins", name: "Jenkins", category: "DevOps" },
  { icon: "SiConfluence", name: "Confluence", category: "Project Management" },
  { icon: "FaCheck", name: "Vitest", category: "Testing" },
  { icon: "FaNetworkWired", name: "Playwright", category: "Testing" },
  { icon: "FaPaperPlane", name: "Bruno", category: "Testing" },
  { icon: "VscFileCode", name: "Jest", category: "Testing" },
  { icon: "FaExchangeAlt", name: "Supertest", category: "Testing" },
  { icon: "FaCloud", name: "Lighthouse", category: "Testing" },
];

export const TOOL_CATEGORIES = [
  "All",
  ...Array.from(new Set(TOOLS.map((tool) => tool.category))).sort((a, b) => a.localeCompare(b)),
];
