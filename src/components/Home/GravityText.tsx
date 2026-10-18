import { Fragment } from "react";

/** Les conteneurs de mots préservent les retours à la ligne ; le libellé complet reste lisible par les technologies d’assistance. */
export default function GravityText({ children, interactive = false }: { children: string; interactive?: boolean }) {
  return <span className="gravity-text">
    <span className="visually-hidden">{children}</span>
    <span aria-hidden="true">{children.split(/(\s+)/).map((word, index) =>
    /\s/.test(word)
      ? <Fragment key={index}>{word}</Fragment>
      : <span className="gravity-word" key={index}>{interactive ? Array.from(word).map((letter, position) => <span className="gravity-letter" key={position}>{letter}</span>) : word}</span>
    )}</span>
  </span>;
}
