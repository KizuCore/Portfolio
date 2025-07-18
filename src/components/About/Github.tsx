import React, { Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Spinner } from "react-bootstrap";
import '../../assets/styles/Git/Git.css';
import { easeOut, motion } from "framer-motion";

// Chargement différé des icônes et composants
const FaGitlab = React.lazy(() =>
  import("react-icons/fa").then(module => ({ default: module.FaGitlab }))
);
const SiGithub = React.lazy(() =>
  import("react-icons/si").then(module => ({ default: module.SiGithub }))
);
const GitHubCalendar = React.lazy(() => import("react-github-calendar"));

const Github: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Section GitHub */}
      <Row className="justify-content-center mb-4">
        <motion.h2
          className="custom-title custom-title-2 my-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t('github_profile')}
        </motion.h2>
        <Col md={6} className="text-center pb-4">
          <Suspense fallback={<Spinner animation="border" role="status" />}>
            <a
              href="https://github.com/KizuCore/"
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
            username="KizuCore"
            blockSize={15}
            blockMargin={5}
            theme={{
              light: ["#eeeeee", "#7093fe", "#7093fe", "#7093fe", "#7093fe"],
              dark: ["#eeeeee", "#7093fe", "#7093fe", "#7093fe", "#7093fe"]
            }}
            fontSize={16}
          />
        </Suspense>
      </Row>

      {/* Section GitLab */}
      <Row className="justify-content-center my-5">
        <motion.h2
          className="custom-title custom-title-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t('gitlab_profile')}
        </motion.h2>
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
};

export default Github;
