// styles
import styles from './comment.module.scss';
const Comment = ({ username, comment, time }) => (
  <div className={styles.comment}>
    <h4>{username} says</h4>
    <p className={styles.timestamp}>{time}</p>
    <p>{comment}</p>
  </div>
);

export default Comment;
