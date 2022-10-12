import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
   
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleEmailChange}
          id="email"
          required
        />
        <span className="popup__input-error" />

        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handlePasswordChange}
          id="password"
          required
        />
        <span className="popup__input-error" />

        <button type="submit" className="login__save-button">
          Зарегистрироваться
        </button>
      </form>

      <div className="register">
        <p className="register__title">Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">
          Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
