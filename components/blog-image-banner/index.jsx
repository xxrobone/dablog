import Image from "next/image";
import styles from "./blog-image-banner.module.css";

export default function BlogImageBanner({ src, alt = "" }) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt}
        className={styles.image}
        fill
        priority
      />
    </div>
  );
}
