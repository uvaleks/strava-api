import Popup from './Popup';
import React from 'react';
import { AppContext } from '../contexts/AppContext';

function ImagePopup({ selectedCard }) {
  const appContext = React.useContext(AppContext);

  return (
    <Popup isOpen={selectedCard && true} name={'image'} onClose={appContext.closeAllPopups}>
        <img className="popup__photo" src={`${selectedCard ? selectedCard.url : '//:0'}`} alt={`Изображение ${selectedCard ? selectedCard.name : 'отсутствует'}`}/>
        <h2 className="popup__photo-title">{`${selectedCard && selectedCard.name}`}</h2>
    </Popup>
  );
}

export default ImagePopup;




