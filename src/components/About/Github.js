import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Profil <strong className="blue">GitHub</strong>
      </h1>
      <GitHubCalendar
        username="Theo22100"
        blockSize={15}
        blockMargin={5}
        color="#7093fe"
        fontSize={16}
      />
    </Row>
  );
}

export default Github;
