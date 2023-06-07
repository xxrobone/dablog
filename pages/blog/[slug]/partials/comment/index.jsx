import Button from "@components/button";
import styles from "./comment.module.css";

export default function Comment({ comment, createdAt, author, id }) {
  const handleDelete = () => {
    console.log({ id });
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
