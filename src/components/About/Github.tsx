import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Spinner } from "react-bootstrap";
import "../../assets/styles/Git/Git.css";
import { easeOut, motion } from "framer-motion";
import { FaGitlab } from "@react-icons/all-files/fa/FaGitlab";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";

const GitHubCalendar = React.lazy(() => import("react-github-calendar"));

const Github: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Row className="justify-content-center mb-4">
        <motion.h2
          className="custom-title custom-title-2 my-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("github_profile")}
        </motion.h2>
        <Col md={6} className="text-center pb-4">
          <a
            href="https://github.com/KizuCore/"
            target="_blank"
            rel="noreferrer"
            className="github-link"
            aria-label={t("github_profile_seo")}
          >
            <SiGithub size={70} className="cursor-pointer" />
          </a>
        </Col>
        <Suspense fallback={<Spinner animation="border" role="status" />}>
          <GitHubCalendar
            username="KizuCore"
            blockSize={15}
            blockMargin={5}
            theme={{
              light: ["#eeeeee", "#7093fe", "#7093fe", "#7093fe", "#7093fe"],
              dark: ["#eeeeee", "#7093fe", "#7093fe", "#7093fe", "#7093fe"],
            }}
            fontSize={16}
          />
        </Suspense>
      </Row>

      <Row className="justify-content-center my-5">
        <motion.h2
          className="custom-title custom-title-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {t("gitlab_profile")}
        </motion.h2>
        <Col md={6} className="text-center">
          <a
            href="https://gitlab.com/Theo35000"
            target="_blank"
            rel="noreferrer"
            className="gitlab-link"
            aria-label={t("gitlab_profile_seo")}
          >
            <FaGitlab size={70} className="cursor-pointer" />
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Github;
