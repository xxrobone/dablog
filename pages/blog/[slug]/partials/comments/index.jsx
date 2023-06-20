import useSWR from 'swr';
import Comment from '../comment';
import { getComments, commentsCacheKey } from '@/api-routes/comments';

// styles
import styles from './comments.module.scss';

export default function Comments({ id, slug }) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */

  const { data: { data:comments = [] } = {}, error } = useSWR(
    id ? commentsCacheKey : null,
    () => getComments(id)
  );

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {comments && comments.filter(c => c.reply_to === null).map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
