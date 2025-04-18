import React, { Suspense } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import "../../assets/styles/About/About.css";
// Chargement différé des icônes
const AiOutlineFileExcel = React.lazy(() => import("react-icons/ai").then(module => ({ default: module.AiOutlineFileExcel })));
const FaBrevo = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaPaperPlane })));
const FaCitry = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaCogs  })));
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


const Tooltip = React.lazy(() => import("react-tooltip").then(module => ({ default: module.Tooltip })));


// Typage outils
interface Tool {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  name: string;
}

const tools: Tool[] = [
  { component: FaWindows, name: "Windows" },
  { component: SiLinux, name: "Linux" },
  { component: VscFileCode, name: "Visual Studio Code" },
  { component: SiAndroidstudio, name: "Android Studio" },
  { component: SiPostman, name: "Postman" },
  { component: SiGit, name: "Git" },
  { component: SiGithub, name: "GitHub" },
  { component: SiGitlab, name: "GitLab" },
  { component: SiPhpmyadmin, name: "phpMyAdmin" },
  { component: SiMamp, name: "MAMP / LAMP / XAMP" },
  { component: SiWireshark, name: "Wireshark" },
  { component: SiAmazonaws, name: "AWS" },
  { component: AiOutlineFileExcel, name: "Excel" },
  { component: SiAxios, name: "Axios" },
  { component: FaCitry, name: "Citry API" },
  { component: FaBrevo, name: "Brevo" },
  { component: SiDocker, name: "Docker" },
  { component: SiFigma, name: "Figma" },
];

const Toolstack: React.FC = () => {
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {tools.map((tool, index) => {
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
                <IconComponent aria-label={tool.name} />
              </Suspense>
            </Col>
          );
        })}
      </Row>

      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <Tooltip id="tool-tooltip"anchorSelect=".tech-icons-1" place="top" />
      </Suspense>
    </div>
  );
};

export default Toolstack;
