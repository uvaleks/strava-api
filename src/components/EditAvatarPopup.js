import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';


function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const [link, setLink] = useState('');
  const appContext = React.useContext(AppContext);

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      setLink('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(link);
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={appContext.closeAllPopups} popupName={'edit-avatar'} title={"Обновить аватар"} buttonText={appContext.isLoading ? 'Сохранение...' : 'Сохранить'}>
      <input onChange={handleLinkChange} value={link} className="popup__input" type="url" name="input-avatar-link" placeholder="Ссылка на картинку" autoComplete="off" required/>
      <span className="input-avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;




