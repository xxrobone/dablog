import { useState, useEffect } from 'react';
import useSWR from 'swr';
import CommentList from '../commentList/commentList';
import { Comment } from '../comment/comment';
import {
  addComment,
  getComments,
  cacheKey,
} from '../../../../../api-routes/comments';
// styles
import styles from './comments.module.scss';

const Comments = ({ slug }) => {
  // if adding typescript useState<string>("")
  const [comment, setComment] = useState('');
  /* const [username, setUsername] = useState(''); */

  const { data: { data = [] } = {} } = useSWR(
    slug ? `${cacheKey}${slug}` : null,
    () => getComments()
  );

  const onChange = (e) => {
    const commentValue = e.target.value;
    setComment(commentValue);
  };

  // if adding for type script e: ChangeEvent<HTMLInputElement>
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('comment added to supabase, success: ', comment);
    addComment(comment);
    setComment('');
  };

  return (
    <div className={styles.comments_wrapper}>
      <h1>Comments ;)</h1>
      <form onSubmit={onSubmit} className={styles.comments_form}>
        <input
          type='text'
          placeholder='Add a comment'
          onChange={onChange}
          value={comment}
        />
        <button type='submit' onSubmit={onSubmit}>
          Submit
        </button>
      </form>
      <ul>
        {data.map((c) => (
            <div key={c.id}>
              <Comment {...c} />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Comments;
