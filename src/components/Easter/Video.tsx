import { JSX, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/styles/Easter/style_easter.css";
import useSequence from "../../utils/Sequence";

const decodeUrl = () => {
  const asciiEncodedUrl = [
    104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 121, 111, 117, 116, 117, 98, 101,
    46, 99, 111, 109, 47, 101, 109, 98, 101, 100, 47, 86, 113, 68, 101, 122, 84, 65, 117, 65,
    55, 48, 63, 97, 117, 116, 111, 112, 108, 97, 121, 61, 49, 38, 108, 111, 111, 112, 61, 49,
    38, 112, 108, 97, 121, 108, 105, 115, 116, 61, 86, 113, 68, 101, 122, 84, 65, 117, 65, 55, 48,
  ];

  return asciiEncodedUrl.map((code) => String.fromCharCode(code)).join("");
};

function VideoPopup(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [showPrideFlash, setShowPrideFlash] = useState(false);
  const { t } = useTranslation();

  useSequence(setShowModal);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    setShowPrideFlash(true);
    const timer = window.setTimeout(() => setShowPrideFlash(false), 950);

    return () => window.clearTimeout(timer);
  }, [showModal]);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className={`pride-flash ${showPrideFlash ? "is-active" : ""}`} aria-hidden="true" />

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        dialogClassName="pride-modal-dialog"
        contentClassName="pride-modal-content"
      >
        <Modal.Header closeButton className="pride-modal-header">
          <Modal.Title className="title-font-easter pride-modal-title">
            {t("pride_mode_title", { defaultValue: "Pride mode active" })}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pride-modal-body">
          <div className="embed-responsive embed-responsive-16by9 pride-video-frame">
            <span className="pride-video-badge">
              {t("pride_mode_badge", { defaultValue: "Rainbow vibe unlocked" })}
            </span>
            <iframe
              className="embed-responsive-item pride-video-embed"
              src={decodeUrl()}
              title={t("pride_mode_video_title", { defaultValue: "Pride easter egg video" })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="pride-modal-footer" />
      </Modal>
    </>
  );
}

export default VideoPopup;
