import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
    }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
            <div className="profile__avatar-edit-button" onClick={onEditAvatar}></div>
            </div>
            <div className="profile__profile-info">
                <div className="profile__name-wrapper">
                    <h1 className="profile__profile-name" id="profile-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
                </div>
                <p className="profile__profile-description" id="profile-description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              likes={card.likes}
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
    </main>
  );
}

export default Main;




