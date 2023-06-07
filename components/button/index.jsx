import styles from "./button.module.css";
import classNames from "classnames";

export default function Button({ children, className, ...props }) {
  return (
    <button className={classNames(styles.container, className)} {...props}>
      {children}
    </button>
  );
}
