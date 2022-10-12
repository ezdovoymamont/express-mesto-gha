import React from "react";

function ImagePopup(props) {
    return(
        <section className={`popup popup_view-photo ${props.card.link && "popup_open"}`}>
            <div className="popup__content">
                <img src={props.card.link} alt={props.card.name} className="popup__photo" />
                <h3 className="popup__description">{props.card.name}</h3>
                <button type="button" className="popup__close-button" onClick={props.onClose} />
            </div>
        </section>
    );
}

export default ImagePopup;