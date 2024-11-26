import React, { Suspense } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import '@style/About/About.css';

// Chargement différé des icônes
const SiVisualstudiocode = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiVisualstudiocode })));
const SiPostman = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiPostman })));
const SiWindows = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiWindows })));
const SiLinux = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiLinux })));
const SiAndroidstudio = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAndroidstudio })));
const SiGit = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGit })));
const SiGithub = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGithub })));
const SiGitlab = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGitlab })));
const SiPhpmyadmin = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiPhpmyadmin })));
const SiMamp = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiMamp })));
const SiWireshark = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiWireshark })));
const SiAmazonaws = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAmazonaws })));
const SiMicrosoftexcel = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiMicrosoftexcel })));
const SiAxios = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiAxios })));

// Chargement différé de ReactTooltip
const ReactTooltip = React.lazy(() => import("react-tooltip"));

// Définition de la liste des outils avec icônes
const tools = [
  { component: SiWindows, name: "Windows" },
  { component: SiLinux, name: "Linux" },
  { component: SiVisualstudiocode, name: "Visual Studio Code" },
  { component: SiAndroidstudio, name: "Android Studio" },
  { component: SiPostman, name: "Postman" },
  { component: SiGit, name: "Git" },
  { component: SiGithub, name: "GitHub" },
  { component: SiGitlab, name: "GitLab" },
  { component: SiPhpmyadmin, name: "phpMyAdmin" },
  { component: SiMamp, name: "MAMP / LAMP" },
  { component: SiWireshark, name: "Wireshark" },
  { component: SiAmazonaws, name: "AWS" },
  { component: SiMicrosoftexcel, name: "Excel" },
  { component: SiAxios, name: "Axios" },
];

function Toolstack() {
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
              data-tip={`${tool.name}`}
            >
              <Suspense fallback={<Spinner animation="border" role="status" />}>
                <IconComponent aria-label={tool.name} />
              </Suspense>
            </Col>
          );
        })}
      </Row>
      <Suspense fallback={<Spinner animation="border" role="status" />}>
        <ReactTooltip />
      </Suspense>
    </div>
  );
}

export default Toolstack;
