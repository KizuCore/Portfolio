import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Spinner } from "react-bootstrap";
import '@style/Git/Git.css';

// Chargement différé des icônes et de GitHubCalendar
const FaGitlab = React.lazy(() => import("react-icons/fa").then(module => ({ default: module.FaGitlab })));
const SiGithub = React.lazy(() => import("react-icons/si").then(module => ({ default: module.SiGithub })));
const GitHubCalendar = React.lazy(() => import("react-github-calendar"));

function Github() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Section GitHub */}
      <Row className="justify-content-center mb-4">
        <h2 className="project-heading mb-4" style={{ fontSize: "2.3em" }}>
          <strong className="blue-title">{t('github_profile')}</strong>
        </h2>
        <Col md={6} className="text-center pb-4">
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <a
              href="https://github.com/Theo22100/"
              target="_blank"
              rel="noreferrer"
              className="github-link"
              aria-label={t('github_profile_seo')}
            >
              <SiGithub size={70} className="cursor-pointer" />
            </a>
          </Suspense>
        </Col>
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <GitHubCalendar
            username="Theo22100"
            blockSize={15}
            blockMargin={5}
            color="#7093fe"
            fontSize={16}
          />
        </Suspense>
      </Row>

      {/* Section GitLab */}
      <Row className="justify-content-center my-5">
        <h2 className="project-heading mb-4"  style={{ fontSize: "2.3em" }}>
          <strong className="blue-title">{t('gitlab_profile')}</strong>
        </h2>
        <Col md={6} className="text-center">
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <a
              href="https://gitlab.com/Theo35000"
              target="_blank"
              rel="noreferrer"
              className="gitlab-link"
              aria-label={t('gitlab_profile_seo')}
            >
              <FaGitlab size={70} className="cursor-pointer" />
            </a>
          </Suspense>
        </Col>
      </Row>
    </div>
  );
}

export default Github;
