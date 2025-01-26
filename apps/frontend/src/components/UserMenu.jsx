import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../store/user-context";

export default function UserMenu() {
  const { user, isAuthenticated } = useContext(AuthContext);
  let userId;

  if (user) {
    userId = user.id;
  }

  console.log(user);
  console.log(isAuthenticated);

  const welcomeMsg = user ? `Welcome, ${user.username}` : "Please, register";

  return (
    <aside>
      <section>
        <h2>{welcomeMsg}</h2>
        <p>
          Messages <strong>Number</strong>
        </p>
        {isAuthenticated && (
          <NavLink to={`new-message/${userId}`}>New Message</NavLink>
        )}
      </section>
    </aside>
  );
}
