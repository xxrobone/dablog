import { useState } from 'react';
// styles
import styles from './comments.module.scss';

const Comments = () => {
  // if adding typescript useState<string>("")
  const [comment, setComment] = useState('');

  const onChange = (e) => {
    const commentValue = e.target.value;
    setComment(commentValue);
  };

  // if adding for type script e: ChangeEvent<HTMLInputElement>
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
  };

  return (
    <div className={styles.comments_wrapper}>
      <h1>Comments ;)</h1>
      <form onSubmit={onSubmit} className={styles.comments_form}>
        <input type='text' placeholder='Add a comment' onChange={onChange} />
        <button type='submit' onSubmit={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comments;
