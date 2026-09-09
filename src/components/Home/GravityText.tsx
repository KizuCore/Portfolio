import { Fragment } from "react";

/** Word wrappers retain normal wrapping; the intact label remains readable to assistive technology. */
export default function GravityText({ children }: { children: string }) {
  return <span className="gravity-text" aria-label={children}>{children.split(/(\s+)/).map((word, index) =>
    /\s/.test(word)
      ? <Fragment key={index}>{word}</Fragment>
      : <span className="gravity-word" aria-hidden="true" key={index}>{Array.from(word).map((letter, position) => <span className="gravity-letter" key={position}>{letter}</span>)}</span>
  )}</span>;
}
