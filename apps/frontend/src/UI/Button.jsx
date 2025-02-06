import classes from "../styles/Button.module.css";

export default function Button({
  children,
  buttonType,
  type,
  isDisabled,
  onClick,
}) {
  const buttonClass =
    buttonType === "primary" ? classes.primary : classes.secondary;

  return (
    <button
      className={buttonClass}
      type={type || undefined}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
