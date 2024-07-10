import React from "react";
import Card from "react-bootstrap/Card";
function AboutCard() {
  return ( 
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Bonjour à tous, je suis <span className="blue">Théo Guérin </span>
            de <span className="blue"> Rennes, France.</span>
            <br />
            <br />
            Je suis actuellement <span className="blue">Développeur web Full-Stack</span> de 23 ans en alternance.
            <br />
            <br />
            J'ai actuellement :
            <br/>
            <br/>
            <ul>
              <li className="about-activity"> Licence Informatique-Electronique (Rennes ISTIC)</li> 
              <li className="about-activity"> Bachelor Développeur-Web (Rennes MyDigitalSchool)</li> 
              <li className="about-activity"> Titre Concepteur Développeur d'application</li>
            </ul>
            <br />
            En dehors du codage, voici quelques autres activités que j'aime faire :
          </p>
          <ul>
            <li className="about-activity">
              ✈️ • Voyager
            </li>
            <li className="about-activity">
              📷 • Prendre des photos
            </li>
            <li className="about-activity">
              🔭 • Astronomie
            </li>
            <li className="about-activity">
              🐈‍⬛ • M'occuper d'animaux
            </li>
          </ul>

        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
