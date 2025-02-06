import { useRouteError, NavLink } from "react-router-dom";

import classes from "../styles/Error.module.css";

export default function Error() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  return (
    <div className={classes.content}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.message}>{message}</p>
      <div className={classes.actions}>
        <NavLink className={classes.link} to="/">
          Return
        </NavLink>
      </div>
    </div>
  );
}
