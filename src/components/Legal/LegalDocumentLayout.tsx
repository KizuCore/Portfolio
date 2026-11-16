import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiFileText } from "@react-icons/all-files/fi/FiFileText";
import { FiShield } from "@react-icons/all-files/fi/FiShield";
import { FiSliders } from "@react-icons/all-files/fi/FiSliders";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { matchesLegalSearch } from "../../utils/legalSearch";
import "../../assets/styles/Legals/Legals.css";

const documents = [
  { key: "notice", path: "mentions-legales", label: "footer_links.legal", Icon: FiFileText },
  { key: "privacy", path: "politique-de-confidentialite", label: "footer_links.privacy", Icon: FiShield },
  { key: "cookies", path: "politique-des-cookies", label: "footer_links.cookies_policy", Icon: FiSliders },
] as const;

type ElementProps = { children?: ReactNode; id?: string; tabIndex?: number; "aria-labelledby"?: string };
function textContent(node: ReactNode): string {
  return Children.toArray(node).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    return isValidElement<ElementProps>(child) ? textContent(child.props.children) : "";
  }).join(" ");
}

export default function LegalDocumentLayout({ kind, language, title, children }: {
  kind: typeof documents[number]["key"];
  language: string;
  title: string;
  children: ReactNode;
}) {
  const { i18n } = useTranslation();
  const tx = i18n.getFixedT(language);
  const routeLanguage = (i18n.resolvedLanguage ?? i18n.language ?? "fr").split("-")[0];
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState("");
  const articleRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { content, sections } = useMemo(() => {
    const entries: { id: string; label: string; text: string }[] = [];
    const content = Children.map(children, (child) => {
      if (!isValidElement<ElementProps>(child) || child.type !== "section") return child;
      const heading = Children.toArray(child.props.children).find((node) => isValidElement(node) && node.type === "h2") as ReactElement<ElementProps> | undefined;
      if (!heading) return child;
      const id = heading.props.id ?? `legal-${kind}-${entries.length + 1}`;
      entries.push({ id, label: textContent(heading.props.children), text: textContent(child.props.children) });
      return cloneElement(child, { "aria-labelledby": id }, Children.map(child.props.children, (node) =>
        isValidElement(node) && node.type === "h2" ? cloneElement(node as ReactElement<ElementProps>, { id, tabIndex: -1 }) : node));
    });
    return { content, sections: entries };
  }, [children, kind]);
  const results = sections.filter((section) => matchesLegalSearch(section.text, query));

  useEffect(() => {
    const headings = Array.from(articleRef.current?.querySelectorAll<HTMLElement>("h2[id]") ?? []);
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 112;
      const current = headings.filter((heading) => heading.getBoundingClientRect().top <= offset + 32).at(-1) ?? headings[0];
      setActiveId(current?.id ?? "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    // Lazy-loaded legal pages also support links directly to a section.
    const target = headings.find((heading) => `#${heading.id}` === window.location.hash);
    target?.scrollIntoView({ behavior: "instant", block: "start" });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [kind, language]);

  const CurrentIcon = documents.find((document) => document.key === kind)!.Icon;
  return (
    <div className="legal-page site-page">
      <div className="legal-content-container page-content site-container">
        <header className="legal-header">
          <span className="legal-eyebrow page-eyebrow"><CurrentIcon aria-hidden="true" size={17} />{tx("legal_navigation.eyebrow")}</span>
          <h1 id="legal-page-title" className="legal-title page-title">{title}</h1>
          <p className="legal-intro">{tx(`legal_navigation.intro.${kind}`)}</p>
        </header>
        <div className="legal-layout grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8">
          <aside className="legal-sidebar" aria-label={tx("legal_navigation.navigation")}>
            <button className="legal-mobile-toggle" type="button" aria-expanded={expanded} aria-controls="legal-navigation-panel" onClick={() => setExpanded(!expanded)}>
              <span><FiSearch aria-hidden="true" />{tx("legal_navigation.mobile")}</span><FiChevronDown aria-hidden="true" />
            </button>
            <div id="legal-navigation-panel" className="legal-navigation-panel" data-expanded={expanded}>
              <div className="legal-sidebar-card">
                <label className="legal-sidebar-title" htmlFor="legal-search">{tx("legal_navigation.search")}</label>
                <div className="legal-search-field">
                  <FiSearch aria-hidden="true" size={16} />
                  <input ref={searchRef} id="legal-search" type="search" value={query} placeholder={tx("legal_navigation.placeholder")} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
                  {query && <button type="button" aria-label={tx("legal_navigation.clear")} onClick={() => { setQuery(""); searchRef.current?.focus(); }}><FiX aria-hidden="true" size={16} /></button>}
                </div>
                <nav aria-label={tx("legal_navigation.contents")}>
                  <p className="legal-contents-label">{tx("legal_navigation.contents")}</p>
                  <p className="legal-search-status" role="status">{query.trim() ? tx("legal_navigation.results", { count: results.length }) : ""}</p>
                  {results.length ? <ol className="legal-contents">
                    {results.map((section) => <li key={section.id}>
                      <a href={`#${section.id}`} aria-current={activeId === section.id ? "location" : undefined} onClick={() => {
                        setExpanded(false);
                        setActiveId(section.id);
                        document.getElementById(section.id)?.focus({ preventScroll: true });
                      }}><span aria-hidden="true">{String(sections.indexOf(section) + 1).padStart(2, "0")}</span>{section.label.replace(/^\d+[.)]\s*/, "")}</a>
                    </li>)}
                  </ol> : <p className="legal-empty">{tx("legal_navigation.empty")}</p>}
                </nav>
              </div>
              <nav className="legal-related" aria-label={tx("legal_navigation.documents")}>
                <p className="legal-sidebar-title">{tx("legal_navigation.documents")}</p>
                {documents.map(({ key, path, label, Icon }) => <Link key={key} to={`/${routeLanguage}/${path}`} aria-current={key === kind ? "page" : undefined}><Icon size={16} aria-hidden="true" /><span>{tx(label)}</span></Link>)}
              </nav>
            </div>
          </aside>
          <article ref={articleRef} className="legal-document" aria-labelledby="legal-page-title"><div className="legal-info-box">{content}</div></article>
        </div>
      </div>
    </div>
  );
}
