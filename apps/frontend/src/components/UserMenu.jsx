import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/user-context";

import classes from "../styles/UserMenu.module.css";

export default function UserMenu() {
  const { user, isAuthenticated } = useContext(AuthContext);
  let userId;

  if (user) {
    userId = user.id;
  }

  const welcomeMsg = user
    ? `Welcome, ${user.username}`
    : "Please log in or register to continue";

  return (
    <aside className={classes.sideBar}>
      <section className={classes.sectionTitle}>
        <h2>{welcomeMsg}</h2>
        {isAuthenticated && (
          <ul className={classes.linkList}>
            <li>
              <NavLink className={classes.link} to={`new-message/${userId}`}>
                New Message
              </NavLink>
            </li>
          </ul>
        )}
      </section>
    </aside>
  );
}
