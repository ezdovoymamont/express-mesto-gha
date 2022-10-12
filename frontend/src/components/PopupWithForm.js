import React from "react";

function PopupWithForm(props) {

    return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_open"}`}>
        <div className={`popup__${props.popup}`} >
            <button className="popup__close-button" type="button" onClick={props.onClose} />
            <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
                <fieldset className="popup__set">
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button type="submit" className={`popup__save-button popup__save-button-${props.button}`} >{props.buttonText}</button>
                </fieldset>
            </form>
        </div>
    </div>
    );
}

export default PopupWithForm;