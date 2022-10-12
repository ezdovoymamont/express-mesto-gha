import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription ] = React.useState("");

    React.useEffect(() =>{
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    } 

    return(
        // Редактировать профиль
        <PopupWithForm
        name = "profile"
        title = "Редактировать профиль"
        button = "profile"
        buttonText = "Сохранить"
        popup = "window"
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                className="popup__input popup__input_type_name"
                type="text" name="name"
                placeholder="Введите имя"
                value={name}
                onChange={handleNameChange}
                id="profile-name"
                minLength={2}
                maxLength={40}
                required
                />
                <span className="popup__input-error profile-name-error" />
            </label>
            <label className="popup__field">
                <input
                className="popup__input popup__input_type_job"
                type="text" name="job"
                placeholder="Введите профессию"
                value={description}
                onChange={handleDescriptionChange}
                id="profile-job"
                minLength={2}
                maxLength={200}
                required
                />
                <span className="popup__input-error profile-job-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;