import classNames from "classnames";
import styles from "./text-area.module.css";

export default function TextArea({ className, ...props }) {
  return (
    <textarea className={classNames(styles.container, className)} {...props} />
  );
}
