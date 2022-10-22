import Popup from "../Popup";
import "./InfoTooltip.css";

function InfoTooltip({ message: { text, isError }, isOpen, onClose }) {
  return (
    <Popup name="info-tooltip" isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <div
          className={`info-tooltip__status-image${
            (isError === null && "") ||
            (isError === true && " info-tooltip__status-image_type_error") ||
            (isError === false && " info-tooltip__status-image_type_success")
          }`}
        ></div>
        <p className="info-tooltip__message">{text}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
