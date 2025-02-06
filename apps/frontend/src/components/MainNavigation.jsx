import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/user-context";

import classes from "../styles/MainNavigation.module.css";

export default function MainNavigation() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>Dashboard Message</h1>
      <nav className={classes.nav}>
        <ul className={classes.navLinks}>
          <li className={classes.navLink}>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isAuthenticated && (
            <>
              <li className={classes.navLink}>
                <NavLink to="register">Register</NavLink>
              </li>
              <li className={classes.navLink}>
                <NavLink to="login">Log In</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className={classes.navLink}>
              <NavLink to="Logout">Log Out</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
