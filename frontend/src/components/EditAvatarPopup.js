import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatar = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  React.useEffect(() => {
    avatar.current.value = "";
  }, [props.isOpen]);

    return(
        // Обновить аватар
        <PopupWithForm
          name = "edit-avatar"
          title = "Обновить аватар"
          buttonText = "Сохранить"
          button = "profilePhoto"
          popup = "avatar"
          isOpen = {props.isOpen}
          onClose = {props.onClose}
          onSubmit={handleSubmit}
          >
            <label className="popup__field">
              <input
                  className="popup__input popup__input_type_link"
                  type="url"
                  name="link-image"
                  placeholder="Ссылка на фоторафию"
                  id="avatar-link"
                  required
                  ref = {avatar}
              />
              <span className="popup__input-error avatar-link-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;