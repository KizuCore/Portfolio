import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function ResumePreview({ file }: { file: string }) {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [pages, setPages] = useState(0);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    // Mesure la largeur réelle de la colonne d’aperçu plutôt que de l’estimer à partir de la fenêtre.
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(1, Math.floor(entry.contentRect.width)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="resume-preview" ref={container} aria-busy={!ready && !hasError}>
      {!ready && !hasError && (
        <div className="resume-loading" role="status">
          <Spinner animation="border" aria-hidden="true" />
          <span>{t("a11y.loading_content")}</span>
        </div>
      )}
      {hasError ? (
        <p className="resume-error" role="alert">{t("error_loading_pdf")}</p>
      ) : width > 0 && (
        <Document
          file={file}
          loading={null}
          onLoadSuccess={({ numPages }) => setPages(numPages)}
          onLoadError={() => setHasError(true)}
        >
          {Array.from({ length: pages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={width}
              loading={null}
              onRenderSuccess={() => { if (index === 0) setReady(true); }}
              onRenderError={() => setHasError(true)}
              renderTextLayer
              renderAnnotationLayer
            />
          ))}
        </Document>
      )}
    </div>
  );
}
