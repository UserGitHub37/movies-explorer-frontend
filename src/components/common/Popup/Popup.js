import { useEffect } from "react";
import './Popup.css';

const Popup = ({ isOpen, name, onClose, children }) => {

  useEffect(() => {

    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)

  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`} onClick={handleOverlay}>
      <div className="popup__container">
        <button type="button" onClick={onClose} aria-label="Закрыть окно" className="popup__close-button"></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
