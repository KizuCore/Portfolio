import { useEffect, useRef, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const opacityRef = useRef<Animation | null>(null);
  const targetOpen = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    animationRef.current?.cancel();
    opacityRef.current?.cancel();
  }, []);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = detailsRef.current;
    const content = answerRef.current;
    if (!details || !content) return;
    event.preventDefault();

    // Repart de la hauteur visible, même si le visiteur reclique pendant la transition.
    const startHeight = details.getBoundingClientRect().height;
    const startOpacity = details.open ? Number(getComputedStyle(content).opacity) : 0;
    const opening = animationRef.current ? !targetOpen.current : !details.open;
    targetOpen.current = opening;
    animationRef.current?.cancel();
    opacityRef.current?.cancel();
    animationRef.current = null;

    if (reduceMotion || typeof details.animate !== "function") {
      details.open = opening;
      details.style.overflow = "";
      return;
    }

    details.open = true;
    const style = getComputedStyle(details);
    const spacing = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
      + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const closedHeight = event.currentTarget.getBoundingClientRect().height + spacing;
    const endHeight = closedHeight + (opening ? content.getBoundingClientRect().height : 0);
    details.style.overflow = "hidden";

    const animation = details.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    animationRef.current = animation;
    opacityRef.current = content.animate(
      [{ opacity: startOpacity }, { opacity: opening ? 1 : 0 }],
      { duration: 180, easing: "ease-out", fill: "both" },
    );
    animation.onfinish = () => {
      if (animationRef.current !== animation) return;
      details.open = opening;
      opacityRef.current?.cancel();
      opacityRef.current = null;
      details.style.overflow = "";
      animationRef.current = null;
    };
  };

  return <details ref={detailsRef}>
    <summary onClick={toggle}>{question}</summary>
    <div ref={answerRef} className="business-faq-answer"><p>{answer}</p></div>
  </details>;
}
