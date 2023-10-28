import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import appleWatch from '../images/gear/apple-watch.svg';
import garmin from '../images/gear/garmin.svg';
import polar from '../images/gear/polar.svg';
import suunto from '../images/gear/suunto.svg';
import coros from '../images/gear/coros.png';
import nike from '../images/shoes/nike.svg';
import adidas from '../images/shoes/adidas.png';
import brooks from '../images/shoes/brooks.svg';

function Main({
    richRunCards,
    setSelectedCard,
    // stats
    }) {
  
  const { currentUser, statistics } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={currentUser.profile} alt="Аватар"/>
            {/* <div className="profile__avatar-edit-button" onClick={onEditAvatar}></div> */}
            </div>
            <div className="profile__profile-info">
                <div className="profile__name-wrapper">
                    <h1 className="profile__profile-name" id="profile-name">{`${currentUser.firstname} ${currentUser.lastname}`}</h1>
                    {/* <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button> */}
                </div>
                <p className="profile__profile-description" id="profile-description">{currentUser.bio}</p>
            </div>
            <div className="profile__overview">
              <div className="profile__overview-row">
                <div className="profile__overview-row-title">Year total</div>
                <div className="profile__overview-row-value">{`${statistics && statistics.ytd_run_totals.distance} m`}</div>
              </div>
              <div className="profile__overview-row">
                <div className="profile__overview-row-title">Tracked by</div>
                <img className="profile__overview-icon" src={polar} />
              </div>
              <div className="profile__overview-row">
                <div className="profile__overview-row-title">Actual shoes</div>
                <img className="profile__overview-icon" src={brooks} />
              </div>
            </div>
            {/* <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button> */}
        </section>
        <section className="elements">
          {richRunCards && richRunCards.toReversed().map((card) => (
            <Card
              name={card.name}
              // link={card.link}
              likesCount={card.kudos_count}
              key={card.id}
              id={card.id}
              url={card.photos.primary.urls[600]}
              // card={card}
              // onCardClick={onCardClick}
              setSelectedCard={setSelectedCard}
              // onCardLike={onCardLike}
              // onCardDelete={onCardDelete}
            />
          ))}
        </section>
    </main>
  );
}

export default Main;




