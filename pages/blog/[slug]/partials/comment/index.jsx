import Button from '@components/button';
import styles from './comment.module.css';
import {
  commentsCacheKey,
  deleteComment,
  addComment,
  editComment,
  getReplies,
} from '@/api-routes/comments';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import Input from '@components/input';
import Label from '@components/label';
import { useRef } from 'react';
import { timeAgo } from '@/utils/timeAgo';

export default function Comment({ comment, created_at, username, id, post_id}) {
  const formRef = useRef();

  const { data: { data: replies = [] } = {}, error } = useSWR(
    id ? commentsCacheKey : null,
    () => getReplies(id)
  );

  console.log('post id?:', post_id)
  console.log('comment id: ',id)
  const { trigger: deleteTrigger } = useSWRMutation(
    commentsCacheKey,
    deleteComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { trigger: addTrigger } = useSWRMutation(
    commentsCacheKey,
    addComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  /* const { trigger: deleteTrigger } = useSWRMutation(
    `${replyCacheKey}/${id}`,
    deleteComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  ); */

  /*   const handleDeleteComment = async () => {
    const { data, error } = await deleteTrigger(id);
  }; */

  const handleReply = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { username, comment } = Object.fromEntries(formData);

    const newComment = {
      username,
      comment,
      post_id,
      reply_to: id,
    };
    console.log('add reply id:', id);
    const { status, data, error } = await addTrigger(newComment);
    formRef.current.reset();
  };

  const handleDelete = async (id) => {
    const { data, error } = await deleteTrigger(id);
    console.log(id);
  };

  return (
    <div className={styles.container}>
      <p className={styles.author}>{username}:</p>
      <p>{comment}</p>
      <time className={styles.date}>{timeAgo(created_at)}</time>

      {replies && replies.filter((reply) => reply.reply_to === id).map(r => (
        <div key={r.id}>
          <p>{r.username}</p>
          <p className={styles.replyText}>| {r.comment}</p>
          <button
            className={styles.removeReplyButton}
            onClick={() => handleDelete(r.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Add the <form> element and onSubmit event handler */}
      <form ref={formRef} onSubmit={handleReply}>
        <div className={styles.buttonContainer}>
          <Button onClick={handleDelete}>Delete</Button>
          <Label htmlFor='username'>name</Label>
          <Input id='username' name='username' />
          <Label htmlFor='comment'>reply</Label>
          <Input id='comment' name='comment' />
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
}
