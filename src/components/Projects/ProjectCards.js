import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsGithub, BsYoutube } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title><strong className="blue">{props.title}</strong></Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.ghLink} target="_blank">
          <BsGithub /> &nbsp;
          {props.isGitLab ? "GitLab" : "GitHub"}
        </Button>
        {"\n"}
        {"\n"}
        

        {}

        {!props.isGitLab && props.youtubeLink && (
          <Button
            variant="primary"
            href={props.youtubeLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <BsYoutube /> &nbsp;
            {"Vidéo"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
