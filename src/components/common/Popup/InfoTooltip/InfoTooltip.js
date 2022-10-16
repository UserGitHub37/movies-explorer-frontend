import Popup from '../Popup';
import './InfoTooltip.css';

function InfoTooltip ({ message: { text, isError }, isOpen, onClose }) {

  return (
    <Popup name="info-tooltip" isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <div className={`info-tooltip__status-image ${isError && "info-tooltip__status-image_error"}`}></div>
        <p className="info-tooltip__message">{text}</p>
        </div>
    </Popup>
  );
}

export default InfoTooltip;
