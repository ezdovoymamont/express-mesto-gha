import React from "react";

function InfoTooltip(props) {

    let messageСondition = "";
    let messageImg = "";
    if(props.message){
        messageСondition = "Вы успешно зарегистрировались!";
        messageImg = "popup__message_type_success";
    }
    else{
        messageСondition = "Что-то пошло не так! Попробуйте ещё раз.";
        messageImg = "popup__message_type_fail";
    }

    return(
            <div className={`popup ${props.isOpen && "popup_open"}`}>
              <div className="popup__content_info">
                <div className={`popup__message ${messageImg}`}></div>
                <p className="popup__text">{messageСondition}</p>
                <button type="button" className="popup__close-button" onClick={props.onClose} />
              </div>
            </div>
    )
}

export default InfoTooltip;