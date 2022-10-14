import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { createBrowserHistory } from "history";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltiPopupOpen, setIsInfoTooltiPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cards, setCard] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => console.log("Eroor:" + err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCard(res);
      })
      .catch((err) => console.log("Eroor:" + err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCard((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCard((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCard((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleIsInfoTooltiPopupOpen() {
    setIsInfoTooltiPopupOpen(!isInfoTooltiPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltiPopupOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .updateProfile(user)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(link) {
    api
      .updatePhotoProfile(link)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCard([newCard.data, ...cards]);
      })
      .then(closeAllPopups)
      .catch((error) => console.log(error));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setMessage(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setMessage(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltiPopupOpen(true));
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setLoggedIn(true);
          setEmail(email);
        }
      })
      .catch((err) => {
        setMessage(false);
        setIsInfoTooltiPopupOpen(true);
        console.log(err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleLogout() {
    console.log("logout");
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Header link={loggedIn ? "/" : "/sign-in"}
                          text={loggedIn ? "Выйти" : "Войти"}
                          onClick={handleLogout}
                          email={email} />

                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    card={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Header link={"/sign-up"} text={"Регистрация"} />
                  <Login handleLogin={handleLogin} />
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header link={"/sign-in"} text={"Войти"} />
                  <Register handleRegister={handleRegister} />
                </>
              }
            />

            <Route path="/" element={<></>} />

            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>

          {/*Редактировать профиль*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/*Новое место*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          {/*Обновить аватар*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/*Вы уверены? (Подтверждение удаления фотокартоки)*/}
          <PopupWithForm
            name="delete-photo"
            title="Вы уверены?"
            buttonText="Да"
            button="delete"
            popup="confirmation"
            isOpen={false}
            onClose={closeAllPopups}
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

          <InfoTooltip
            isOpen={isInfoTooltiPopupOpen}
            onClose={closeAllPopups}
            message={message}
          />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
