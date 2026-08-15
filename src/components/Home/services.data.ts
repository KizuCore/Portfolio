import type { IconType } from "react-icons";
import { FiCode } from "@react-icons/all-files/fi/FiCode";
import { FiLayers } from "@react-icons/all-files/fi/FiLayers";
import { FiServer } from "@react-icons/all-files/fi/FiServer";
import { FiTrendingUp } from "@react-icons/all-files/fi/FiTrendingUp";

export interface ServiceItem {
  key: string;
  icon: IconType;
}

export const SERVICE_ITEMS: ServiceItem[] = [
  { key: "websites", icon: FiCode },
  { key: "apps", icon: FiLayers },
  { key: "api", icon: FiServer },
  { key: "optimization", icon: FiTrendingUp },
];
