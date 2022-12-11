import { useEffect } from 'react';
import { ModalBody, ModalOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ largeImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalBody>
        <img src={largeImage} alt="" />
      </ModalBody>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
