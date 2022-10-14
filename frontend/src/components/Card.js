import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : ''}`
    );

    const isLiked = props.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick({name: props.name, link: props.link});
    }

    function handleLikeClick() {
        props.onCardLike(props);
    }

    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    return(
            <li className="element">
                <img src={props.link} alt={props.name} className="element__photo" onClick={handleClick} />
                <div className="element__text">
                    <h2 className="element__title">{props.name}</h2>
                    <div className="element__like-block">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                        <span className="element__like-count">{props.likes.length}</span>
                    </div>
                </div>
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
            </li>
    );
}

export default Card;
