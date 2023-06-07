import classNames from "classnames";
import styles from "./label.module.css";

export default function Label({ children, className, ...props }) {
  return (
    <label className={classNames(styles.container, className)} {...props}>
      {children}
    </label>
  );
}
