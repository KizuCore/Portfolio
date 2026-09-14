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
  { key: "apps", technology: "React", icon: FiLayers, path: "/fr/services/developpeur-react" },
  { key: "api", technology: "Django", icon: FiServer, path: "/fr/services/developpeur-django" },
  { key: "mobile", technology: "Flutter", icon: FiSmartphone, path: "/fr/services/developpeur-flutter" },
];
