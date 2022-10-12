import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { email, link, text, onClick } = props;

  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип" className="logo header__logo" />
      <div className="header__info">
        {email ? <p className="header__email">{email}</p> : ""}
        <Link className="header__link" to={link} onClick={onClick}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;