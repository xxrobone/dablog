import classNames from "classnames";
import styles from "./input.module.css";

export default function Input({ className, ...props }) {
  return (
    <input className={classNames(styles.container, className)} {...props} />
  );
}
