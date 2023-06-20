import Button from '@components/button';
import styles from './comment.module.css';
import {
  commentsCacheKey,
  deleteComment,
  addComment,
  editComment,
  replyCacheKey,
  getReplies,
} from '@/api-routes/comments';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import Input from '@components/input';
import Label from '@components/label';
import { useRef } from 'react';
import {timeAgo} from '@/utils/timeAgo'

export default function Comment({
  comment,
  created_at,
  username,
  id,
}) {
  const formRef = useRef();

  const { data: { data: replies = [] } = {}, error } = useSWR(
    id ? `${replyCacheKey}/${id}` : null,
    () => getReplies(id)
  );

  const { trigger: removeCommentTrigger } = useSWRMutation(
    commentsCacheKey,
    deleteComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { trigger: addReplyTrigger } = useSWRMutation(
    `${replyCacheKey}/${id}`,
    addComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { trigger: removeReplyTrigger } = useSWRMutation(
    `${replyCacheKey}/${id}`,
    deleteComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDeleteComment = async () => {
    const { data, error } = await removeCommentTrigger(id);
  };

  const handleAddReply = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { replyText } = Object.fromEntries(formData);

    const newReply = {
      body: replyText,
      reply_to: id,
    };
    const { status, data, error } = await addReplyTrigger(newReply);
    formRef.current.reset();
  };

  const handleRemoveReply = async (replyId) => {
    console.log({ replyId });

    const { data, error } = await removeReplyTrigger(replyId);
    console.log(replyId);
  };

  return (
    <div className={styles.container}>
      <p className={styles.author}>{username}:</p>
      <p>{comment}</p>
      <time className={styles.date}>{timeAgo(created_at)}</time>

      {replies.map((reply) => (
        <div key={reply.id}>
          <p className={styles.replyText}>| {reply.comment}</p>
          <button
            className={styles.removeReplyButton}
            onClick={() => handleRemoveReply(reply.id)}
          >
            Remove reply
          </button>
        </div>
      ))}

      {/* Add the <form> element and onSubmit event handler */}
      <form ref={formRef} onSubmit={handleAddReply}>
        <div className={styles.buttonContainer}>
          <Button onClick={handleDeleteComment}>Delete</Button>
          <Label htmlFor='replyText'>Reply</Label>
          <Input id='replyText' name='replyText' />
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </div>
  );
}
