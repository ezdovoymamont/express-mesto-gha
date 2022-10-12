import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return(
        <main className="content">
            <section className="profile page__profile">

                {/*Редактировать фото профиля*/}
                <button
                    className="edit-avatar profile__edit-avatar"
                    type="button"
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                    onClick={props.onEditAvatar}
                >
                </button>

                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__job">{currentUser.about}</p>
                {/*Редактировать профиль*/}
                <button className="edit-profile profile__edit-profile" type="button" onClick={props.onEditProfile} />

                {/*Добавить фото*/}
                <button className="add-button profile__add-button" type="button" onClick={props.onAddPlace} />

            </section>

            <section className="elements page__elements">
                <ul className="elements__list">
                    {props.card.map((card) => (
                        <Card 
                        name = {card.name}
                        link = {card.link}
                        likes = {card.likes}
                        key = {card._id}
                        _id = {card._id}
                        owner={card.owner}
                        onCardClick={props.onCardClick} 
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;