import React from "react";
import { useTranslation } from 'react-i18next';
import GitHubCalendar from "react-github-calendar";
import { Row, Col } from "react-bootstrap";
import { FaGitlab } from "react-icons/fa";

function Github() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Section GitHub */}
      <Row className="justify-content-center mb-4">
        <h2 className="project-heading mb-5">
          <strong className="blue-title">{t('github_profile')}</strong>
        </h2>
        <GitHubCalendar
          username="Theo22100"
          blockSize={15}
          blockMargin={5}
          color="#7093fe"
          fontSize={16}
        />
      </Row>

      {/* Section GitLab */}
      <Row className="justify-content-center my-5">
        <h2 className="project-heading mb-5">
          <strong className="blue-title">{t('gitlab_profile')}</strong>
        </h2>
        <Col md={6} className="text-center">
          <a
            href="https://gitlab.com/Theo35000"
            target="_blank"
            rel="noreferrer"
            className="gitlab-link" 
            aria-label="Voir le profil GitLab de Théo Guérin"
          >
            <FaGitlab size={70} className="cursor-pointer"/>
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Github;
