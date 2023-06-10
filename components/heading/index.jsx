import styles from "./heading.module.css";

export default function Heading({ children }) {
  return <span className={styles.container}>{children}</span>;
}
