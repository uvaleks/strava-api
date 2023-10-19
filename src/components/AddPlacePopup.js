import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function AddPlacePopup({ isOpen, onAddCard }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const appContext = React.useContext(AppContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddCard(name, link);
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={appContext.closeAllPopups} popupName={'add'} title={"Новое место"} buttonText={appContext.isLoading ? 'Создание...' : 'Создать'}>
      <input onChange={handleNameChange} value={name} className="popup__input" type="text" name="input-place" placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
      <span className="input-place-error popup__input-error"></span>
      <input onChange={handleLinkChange} value={link} className="popup__input" type="url" name="input-link" placeholder="Ссылка на картинку" autoComplete="off" required/>
      <span className="input-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;




