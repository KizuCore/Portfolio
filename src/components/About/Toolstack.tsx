import React, { Suspense, useState } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import "../../assets/styles/About/About.css";

const AiOutlineFileExcel = React.lazy(() => import("react-icons/ai").then(module => ({ default: module.AiOutlineFileExcel })));
const FaBrevo = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaPaperPlane })));
const FaCitry = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaCogs })));
const FaWindows = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaWindows })));
const SiAmazonaws = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAmazon })));
const SiAndroidstudio = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAndroidstudio })));
const SiAxios = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAxios })));
const SiDocker = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiDocker })));
const SiFigma = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiFigma })));
const SiGit = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGit })));
const SiGithub = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGithub })));
const SiGitlab = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGitlab })));
const SiLinux = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiLinux })));
const SiMamp = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiMamp })));
const SiPhpmyadmin = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiPhpmyadmin })));
const SiPostman = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiPostman })));
const SiWireshark = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiWireshark })));
const VscFileCode = React.lazy(() => import("react-icons/vsc").then(module => ({ default: module.VscFileCode })));
const AdobePhotoshop = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAdobephotoshop })));
const AdobePremier = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAdobepremierepro })));
const Jira = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiJira })));
const Trello = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiTrello })));
const Jenkins = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiJenkins })));
const Confluence = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiConfluence })));

const Tooltip = React.lazy(() => import("react-tooltip").then(module => ({ default: module.Tooltip })));

interface Tool {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
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
  { component: SiPhpmyadmin, name: "phpMyAdmin", category: "Database" },
  { component: SiMamp, name: "MAMP / LAMP / XAMP", category: "Database" },
  { component: SiWireshark, name: "Wireshark", category: "Networking" },
  { component: SiAmazonaws, name: "AWS", category: "Cloud" },
  { component: AiOutlineFileExcel, name: "Excel", category: "Productivity" },
  { component: SiAxios, name: "Axios", category: "API" },
  { component: FaCitry, name: "Citry API", category: "API" },
  { component: FaBrevo, name: "Brevo", category: "Communication" },
  { component: SiDocker, name: "Docker", category: "DevOps" },
  { component: AdobePhotoshop, name: "Adobe Photoshop", category: "Design" },
  { component: SiFigma, name: "Figma", category: "Design" },
  { component: AdobePremier, name: "Adobe Premiere Pro", category: "Design" },
  { component: Jira, name: "Jira", category: "Project Management" },
  { component: Trello, name: "Trello", category: "Project Management" },
  { component: Jenkins, name: "Jenkins", category: "DevOps" },
  { component: Confluence, name: "Confluence", category: "Project Management" },
];

const Toolstack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(tools.map(t => t.category)))];

  return (
    <div>
      <div className="category-buttons" style={{ textAlign: "center", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "primary" : "outline-secondary"}
            onClick={() => setSelectedCategory(cat)}
            style={{ margin: "5px" }}
          >
            {cat}
          </Button>
        ))}
      </div>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {tools
          .filter(tool => selectedCategory === "All" || tool.category === selectedCategory)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tool, index) => {
            const IconComponent = tool.component;
            return (
              <Col
                key={index}
                xs={4}
                md={2}
                className="tech-icons-1"
                data-tooltip-id="tool-tooltip"
                data-tooltip-content={tool.name}
              >
                <Suspense fallback={<Spinner animation="border" role="status" />}>
                  <IconComponent aria-label={tool.name} title={tool.name} />
                </Suspense>
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





