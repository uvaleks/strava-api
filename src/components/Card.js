import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, link, likes, card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    return (
        <article className="card">
            <img onClick={handleClick} className="card__photo" src={link} alt={name}/>
            {isOwn && <div className="card__delete-button-wrapper">
                <button onClick={handleDeleteClick} className="card__delete-button" type="button" aria-label="Удалить"/>
            </div>} 
            <div className="card__bar">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-wrapper">
                <button onClick={handleLikeClick} className={`card__like-button ${isLiked && 'card__like-button_active'}`} type="button" aria-label="Нравится"></button>
                {(likes.length > 0) && <p className="card__like-counter">{likes.length}</p>}
                </div>
            </div>
        </article>
    );
}

export default Card;