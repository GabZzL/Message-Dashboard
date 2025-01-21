import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header>
      <h1>Dashboard Message</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="register">Register</NavLink>
          </li>
          <li>
            <NavLink to="login">Log In</NavLink>
          </li>
          <li>
            <NavLink to="Logout">Log Out</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
