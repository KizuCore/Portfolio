import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col, Spinner } from "react-bootstrap";
import Particle from "../Utils/Particle";
import pdf from "@pdf/CV-Guerin-Theo.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useTranslation } from 'react-i18next';
import '@style/CV/CV.css'; 

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function CV() {
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement du PDF
  const [error, setError] = useState(null); // État pour les erreurs de chargement

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fonction pour bouton
  const DownloadButton = () => (
    <Button
      href={pdf}
      target="_blank"
      className="button-cv"
      aria-label={t('download_cv')} 
    >
      <AiOutlineDownload />
      &nbsp;{t('downloadcv')}
    </Button>
  );

  return (
    <Container fluid className="resume-section text-center">
      <Particle />
      <h1 className="title-font pb-5">
        {t('my')}{" "}
        <span className="blue-title pb-5">{t('cv')}</span>
      </h1>

      {/* Bouton de téléchargement haut */}
      <Row className="justify-content-center mb-4">
        <DownloadButton />
      </Row>

      {/* Affichage du PDF */}
      <Row className="justify-content-center">
        <Col md={8} className="d-flex justify-content-center">
          <div className="pdf-container">
            {isLoading && !error && (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <Spinner animation="border" role="status" aria-hidden="true" />
              </div>
            )}
            {error && <p className="text-danger">{t('error_loading_pdf')}</p>}
            <Document
              file={pdf}
              onLoadSuccess={() => setIsLoading(false)}
              onLoadError={(err) => {
                setError(err);
                setIsLoading(false);
              }}
              aria-label={t('cv_alt_description')}
            >
              <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
            </Document>
          </div>
        </Col>
      </Row>

      {/* Bouton de téléchargement bas */}
      <Row className="justify-content-center mt-4">
        <DownloadButton />
      </Row>
    </Container>
  );
}

export default CV;
