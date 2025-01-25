import { useContext } from "react";
import { AuthContext } from "../store/user-context";

export default function UserMenu() {
  const { user } = useContext(AuthContext);

  const welcomeMsg = user ? `Welcome, ${user.username}` : "Please, register";

  return (
    <aside>
      <section>
        <h2>{welcomeMsg}</h2>
        <p>
          Messages <strong>Number</strong>
        </p>
        <button>New Message</button>
      </section>
    </aside>
  );
}
