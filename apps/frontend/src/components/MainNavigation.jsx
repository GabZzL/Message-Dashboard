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
          <li>Log In</li>
        </ul>
      </nav>
    </header>
  );
}
