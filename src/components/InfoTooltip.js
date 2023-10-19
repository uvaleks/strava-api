import okTooltipStatus from '../images/ok-tooltip-status.svg';
import errorTooltipStatus from '../images/error-tooltip-status.svg';
import Popup from './Popup';

function InfoTooltip({ tooltipStatus, isOpen, onClose, message }) {

  return (
    <Popup isOpen={isOpen} name={'tooltip'} onClose={onClose}>
          <img className="tooltip__status-icon" src={(tooltipStatus === 'Ok') ? okTooltipStatus : errorTooltipStatus} alt={tooltipStatus} />
          <h2 className="tooltip__title">{(tooltipStatus === 'Ok') ? "Вы успешно зарегистрировались!" : ((message) ? message : 'Что-то пошло не так! Попробуйте ещё раз.')}</h2>
    </Popup>
  );
}

export default InfoTooltip;




