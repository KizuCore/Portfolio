import type { ComponentType, SVGProps } from "react";
import { FiLayers } from "@react-icons/all-files/fi/FiLayers";
import { FiServer } from "@react-icons/all-files/fi/FiServer";
import { FiSmartphone } from "@react-icons/all-files/fi/FiSmartphone";

export interface ServiceItem {
  key: string;
  path?: string;
  technology: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SERVICE_ITEMS: ServiceItem[] = [
  { key: "websites", technology: "React", icon: FiLayers, path: "/fr/services/creation-site-internet-rennes" },
  { key: "api", technology: "Django · Node.js", icon: FiServer, path: "/fr/services/developpement-api" },
  { key: "mobile", technology: "Flutter", icon: FiSmartphone, path: "/fr/services/developpeur-flutter" },
];
