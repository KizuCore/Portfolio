import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Particle from "../Utils/Particle.js";
import "../../assets/styles/CV/CV.css";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;


const pdf = "/pdf/CV-Guerin-Theo.pdf";

function CV() {
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DownloadButton = () => (
    <Button href={pdf} target="_blank" className="button-cv">
      <AiOutlineDownload /> &nbsp;{t("downloadcv")}
    </Button>
  );

  return (
    <Container fluid className="resume-section text-center">
      <Particle />
      <h1 className="title-font pb-4">
        {t("my")} <span className="blue-title">{t("cv")}</span>
      </h1>

      <Row className="justify-content-center mb-4">
        <DownloadButton />
      </Row>

      <Row className="justify-content-center">
        <Col md={8} className="d-flex justify-content-center">
          <div className="pdf-container">
            {isLoading && !error && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <Spinner animation="border" role="status" />
              </div>
            )}
            {error && <p className="text-danger">{t("error_loading_pdf")}</p>}
            <Document
              file={pdf}
              onLoadSuccess={() => setIsLoading(false)}
              onLoadError={(err) => {
                setError(err);
                setIsLoading(false);
              }}
            >
              <Page pageNumber={1} scale={width > 786 ? 1.3 : 0.6} renderMode="canvas" renderTextLayer={false} renderAnnotationLayer={false}/>
            </Document>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <DownloadButton />
      </Row>
    </Container>
  );
}

export default CV;
