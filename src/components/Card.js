import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, likesCount, key, id, url, setSelectedCard }) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        setSelectedCard({ 'name': name, 'url': url });
    }

    // function handleLikeClick() {
    //     onCardLike(card);
    // }

    // function handleDeleteClick() {
    //     onCardDelete(card);
    // }

    // const isOwn = card.owner._id === currentUser._id;
    // const isLiked = card.likes.some(i => i._id === currentUser._id);

    return (
        <article onClick={handleClick} className="card" key={id}>
            <img className="card__photo" src={url} alt={name}/>
            {/* {isOwn && <div className="card__delete-button-wrapper">
                <button onClick={handleDeleteClick} className="card__delete-button" type="button" aria-label="Удалить"/>
            </div>}  */}
            <div className="card__bar">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-wrapper">
                {(likesCount > 0) && <p className="card__like-counter">{likesCount}</p>}
                <button className={'card__like-button'} type="button" aria-label="Нравится"></button>
                </div>
            </div>
        </article>
    );
}

export default Card;