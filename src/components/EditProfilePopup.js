import React from 'react';
import { useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const appContext = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAbout(e.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({ name, about });
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={appContext.closeAllPopups} popupName={'edit-form'} title={"Редактировать профиль"} buttonText={appContext.isLoading ? 'Сохранение...' : 'Сохранить'}>
      <input onChange={handleNameChange} value={name} className="popup__input" type="text" name="name" placeholder="Имя" autoComplete="off" minLength="2" maxLength="40" required/>
      <span className="name-error popup__input-error"></span>
      <input onChange={handleDescriptionChange} value={about} className="popup__input" type="text" name="about" placeholder="Занятие" autoComplete="off" minLength="2" maxLength="200" required/>
      <span className="about-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;




