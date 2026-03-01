import React, { Suspense, useState } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import "../../assets/styles/About/About.css";
import { easeOut, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { IconType } from "react-icons";
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

const Tooltip = React.lazy(() => import("react-tooltip").then((module) => ({ default: module.Tooltip })));

interface Tool {
  component: IconType;
  name: string;
  category: string;
}

const tools: Tool[] = [
  { component: FaWindows, name: "Windows", category: "OS" },
  { component: SiLinux, name: "Linux", category: "OS" },
  { component: VscFileCode, name: "Visual Studio Code", category: "IDE" },
  { component: SiAndroidstudio, name: "Android Studio", category: "IDE" },
  { component: SiPostman, name: "Postman", category: "API" },
  { component: SiGit, name: "Git", category: "Version Control" },
  { component: SiGithub, name: "GitHub", category: "Version Control" },
  { component: SiGitlab, name: "GitLab", category: "Version Control" },
  { component: DiMysql, name: "phpMyAdmin", category: "Database" },
  { component: FaDatabase, name: "MAMP / LAMP / XAMP", category: "Database" },
  { component: FaNetworkWired, name: "Wireshark", category: "Networking" },
  { component: SiAmazonaws, name: "AWS", category: "Cloud" },
  { component: AiOutlineFileExcel, name: "Excel", category: "Productivity" },
  { component: FaExchangeAlt, name: "Axios", category: "API" },
  { component: FaCogs, name: "Citry API", category: "API" },
  { component: FaPaperPlane, name: "Brevo", category: "Communication" },
  { component: SiDocker, name: "Docker", category: "DevOps" },
  { component: SiAdobephotoshop, name: "Adobe Photoshop", category: "Design" },
  { component: SiFigma, name: "Figma", category: "Design" },
  { component: SiAdobepremiere, name: "Adobe Premiere Pro", category: "Design" },
  { component: SiJira, name: "Jira", category: "Project Management" },
  { component: SiTrello, name: "Trello", category: "Project Management" },
  { component: SiJenkins, name: "Jenkins", category: "DevOps" },
  { component: SiConfluence, name: "Confluence", category: "Project Management" },
];

const Toolstack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { t } = useTranslation();

  const categories = [
    "All",
    ...Array.from(new Set(tools.map((tool) => tool.category))).sort((a, b) => a.localeCompare(b)),
  ];

  return (
    <div>
      <motion.h2
        className="custom-title custom-title-1 my-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        {t("tools")} {t("i_use")}
      </motion.h2>

      <div className="category-buttons" style={{ textAlign: "center", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline-secondary"}
            onClick={() => setSelectedCategory(cat)}
            style={{ margin: "5px" }}
          >
            {t(`categories.${cat}`)}
          </Button>
        ))}
      </div>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {tools
          .filter((tool) => selectedCategory === "All" || tool.category === selectedCategory)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tool, index) => {
            const IconComponent = tool.component;
            return (
              <Col
                key={index}
                xs={3}
                md={2}
                className="tech-icons-1"
                data-tooltip-id="tool-tooltip"
                data-tooltip-content={tool.name}
              >
                <IconComponent aria-label={tool.name} title={tool.name} />
              </Col>
            );
          })}
      </Row>

      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tool-tooltip" anchorSelect=".tech-icons-1" place="top" />
      </Suspense>
    </div>
  );
};

export default Toolstack;
