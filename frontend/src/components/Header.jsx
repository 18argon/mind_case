import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { authService } from '../services';


export default function Header({ fullName, imageSrc }) {
  const history = useHistory()
  const [ isActive, setIsActive ] = useState(true);
  function handleLogout() {
    authService.logOut()
      .then(_ => {
        history.push("/login");
      });
  }

  return (
    <header className="is-primary">
      <nav
        className={`navbar has-shadow`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            <span className="title">Mind Case</span>
          </NavLink>

          <a
            role="button"
            onClick={() => setIsActive(!isActive)}
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded={isActive ? "true" : "false"}
            data-target="navbarMenu"
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </a>
        </div>

        <div
          id="navbarMenu"
          className={`navbar-menu${isActive ? " is-active" : ""}`}
        >
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/">
              Dashboard
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <span>
                  <img src={imageSrc} alt="Foto de perfil"/>
                </span>
                Olá, {fullName.split(" ")[0]}
              </a>
              <div className="navbar-dropdown is-right">
                <a className="navbar-item" onClick={handleLogout}>
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
