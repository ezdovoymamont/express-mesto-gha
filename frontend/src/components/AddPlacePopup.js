import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

    const [name, setName] = React.useState("");
    const [link, setLink ] = React.useState("");

    React.useEffect(() => {
        if(props.isOpen) {
        setName("");
        setLink("");
        }
    }, [props.isOpen]);

    function handleName(e) {
        setName(e.target.value);
    }

    function handleLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlaceSubmit({
          name,
          link,
        });
    } 

    return(

        // Новое место
        <PopupWithForm
          name = "add-photo"
          title = "Новое место"
          button = "creat"
          buttonText = "Создать"
          popup = "window"
          isOpen = {props.isOpen}
          onClose = {props.onClose}
          onSubmit={handleSubmit}
          >
            <label className="popup__field">
              <input
                  className="popup__input popup__input_type_title"
                  type="text" name="title"
                  placeholder="Название"
                  value={name}
                  onChange={handleName}
                  id="photo-title"
                  minLength={2}
                  maxLength={30}
                  required
              />
              <span className="popup__input-error photo-title-error" />
            </label>
            <label className="popup__field">
              <input
                  className="popup__input popup__input_type_link"
                  type="url"
                  name="link-image"
                  placeholder="Ссылка на картинку"
                  value={link}
                  onChange={handleLink}
                  id="photo-link"
                  required
              />
              <span className="popup__input-error photo-link-error" />
            </label>
          </PopupWithForm>
    )
    
}
export default AddPlacePopup;