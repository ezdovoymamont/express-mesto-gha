import React, { useState } from "react";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Вход</h2>
        <label className="login__field">
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
        </label>

        <label className="login__field">
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль1"
          value={password || ""}
          onChange={handlePasswordChange}
          id="password"
          required
        />
        <span className="popup__input-error" />
        </label>

        <button type="submit" className="login__save-button">
          Войти
        </button>
      </form>
  );
}

export default Login;
