import Popup from './Popup';
import React from 'react';
import { AppContext } from '../contexts/AppContext';

function ImagePopup({ card }) {
  const appContext = React.useContext(AppContext);

  return (
    <Popup isOpen={card && true} name={'image'} onClose={appContext.closeAllPopups}>
        <img className="popup__photo" src={`${card ? card.link : '//:0'}`} alt={`Изображение ${card ? card.name : 'отсутствует'}`}/>
        <h2 className="popup__photo-title">{`${card && card.name}`}</h2>
    </Popup>
  );
}

export default ImagePopup;




