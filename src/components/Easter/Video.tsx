import { useState, JSX } from 'react';
import { Modal } from 'react-bootstrap';
import useSequence from '../Utils/Sequence.tsx';
import '../../assets/styles/Easter/style_easter.css'; 

// Fonction décoder URL
const decodeUrl = () => {
  const asciiEncodedUrl = [
    104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 121, 111, 117, 116, 117, 98, 101, 
    46, 99, 111, 109, 47, 101, 109, 98, 101, 100, 47, 118, 107, 79, 54, 112, 118, 49, 120, 121, 
    77, 103, 63, 97, 117, 116, 111, 112, 108, 97, 121, 61, 49
  ];
  return asciiEncodedUrl.map(code => String.fromCharCode(code)).join('');
};

function VideoPopup(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  useSequence(setShowModal);
  const handleClose = () => setShowModal(false);
  return (
    <>
      {/* Modal pour afficher vidéo */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="modal-header-grey">
          <Modal.Title className='title-font-easter'>Bizarre...</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body-grey'>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={decodeUrl()} // URL vidéo
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-grey">
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VideoPopup;
