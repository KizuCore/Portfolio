import type { ComponentType, SVGProps } from "react";
import { AiOutlineFileExcel } from "@react-icons/all-files/ai/AiOutlineFileExcel";
import { DiMysql } from "@react-icons/all-files/di/DiMysql";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaCogs } from "@react-icons/all-files/fa/FaCogs";
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";
import { FaNetworkWired } from "@react-icons/all-files/fa/FaNetworkWired";
import { FaWindows } from "@react-icons/all-files/fa/FaWindows";
import { SiAmazonaws } from "@react-icons/all-files/si/SiAmazonaws";
import { SiAndroidstudio } from "@react-icons/all-files/si/SiAndroidstudio";
import { SiDocker } from "@react-icons/all-files/si/SiDocker";
import { SiFigma } from "@react-icons/all-files/si/SiFigma";
import { SiGit } from "@react-icons/all-files/si/SiGit";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { SiGitlab } from "@react-icons/all-files/si/SiGitlab";
import { SiLinux } from "@react-icons/all-files/si/SiLinux";
import { SiPostman } from "@react-icons/all-files/si/SiPostman";
import { VscFileCode } from "@react-icons/all-files/vsc/VscFileCode";
import { SiAdobephotoshop } from "@react-icons/all-files/si/SiAdobephotoshop";
import { SiAdobepremiere } from "@react-icons/all-files/si/SiAdobepremiere";
import { SiJira } from "@react-icons/all-files/si/SiJira";
import { SiTrello } from "@react-icons/all-files/si/SiTrello";
import { SiJenkins } from "@react-icons/all-files/si/SiJenkins";
import { SiConfluence } from "@react-icons/all-files/si/SiConfluence";
import { FaCloud } from "@react-icons/all-files/fa/FaCloud";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";

export interface ToolItem {
  component: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  category: string;
}

export const TOOLS: ToolItem[] = [
  { component: FaWindows, name: "Windows", category: "OS" },
  { component: SiLinux, name: "Linux", category: "OS" },
  { component: VscFileCode, name: "Visual Studio Code", category: "IDE" },
  { component: VscFileCode, name: "IntelliJ IDEA", category: "IDE" },
  { component: SiAndroidstudio, name: "Android Studio", category: "IDE" },
  { component: SiPostman, name: "Postman", category: "API" },
  { component: FaExchangeAlt, name: "WooCommerce API", category: "API" },
  { component: FaExchangeAlt, name: "Stripe", category: "API" },
  { component: FaExchangeAlt, name: "Systempay", category: "API" },
  { component: VscFileCode, name: "WeasyPrint", category: "API" },
  { component: FaExchangeAlt, name: "Capacitor", category: "API" },
  { component: FaPaperPlane, name: "LimeSurvey", category: "API" },
  { component: SiGit, name: "Git", category: "Version Control" },
  { component: SiGithub, name: "GitHub", category: "Version Control" },
  { component: SiGitlab, name: "GitLab", category: "Version Control" },
  { component: SiGitlab, name: "GitLab Runner", category: "DevOps" },
  { component: SiGitlab, name: "GitLab CI/CD", category: "DevOps" },
  { component: DiMysql, name: "phpMyAdmin", category: "Database" },
  { component: FaDatabase, name: "MAMP / LAMP / XAMP", category: "Database" },
  { component: FaNetworkWired, name: "Wireshark", category: "Networking" },
  { component: SiAmazonaws, name: "AWS", category: "Cloud" },
  { component: FaCloud, name: "OVH", category: "Cloud" },
  { component: FaCloud, name: "Vercel", category: "Cloud" },
  { component: AiOutlineFileExcel, name: "Excel", category: "Productivity" },
  { component: AiOutlineFileExcel, name: "Pack Office", category: "Productivity" },
  { component: FaExchangeAlt, name: "Axios", category: "API" },
  { component: FaCogs, name: "City API", category: "API" },
  { component: FaPaperPlane, name: "Brevo", category: "Communication" },
  { component: SiDocker, name: "Docker", category: "DevOps" },
  { component: FaNetworkWired, name: "Nginx", category: "DevOps" },
  { component: FaNetworkWired, name: "Traefik", category: "DevOps" },
  { component: FaCogs, name: "Kubernetes", category: "DevOps" },
  { component: FaCogs, name: "Unity", category: "DevOps" },
  { component: SiAdobephotoshop, name: "Adobe Photoshop", category: "Design" },
  { component: SiFigma, name: "Figma", category: "Design" },
  { component: SiAdobepremiere, name: "Adobe Premiere Pro", category: "Design" },
  { component: SiJira, name: "Jira", category: "Project Management" },
  { component: SiTrello, name: "Trello", category: "Project Management" },
  { component: SiJenkins, name: "Jenkins", category: "DevOps" },
  { component: SiConfluence, name: "Confluence", category: "Project Management" },
  { component: FaCheck, name: "Vitest", category: "Testing" },
  { component: FaNetworkWired, name: "Playwright", category: "Testing" },
  { component: FaPaperPlane, name: "Bruno", category: "Testing" },
  { component: VscFileCode, name: "Jest", category: "Testing" },
  { component: FaExchangeAlt, name: "Supertest", category: "Testing" },
  { component: FaCloud, name: "Lighthouse", category: "Testing" },
];

export const TOOL_CATEGORIES = [
  "All",
  ...Array.from(new Set(TOOLS.map((tool) => tool.category))).sort((a, b) => a.localeCompare(b)),
];
