import { useRef } from 'react';
import Button from '@components/button';
import Input from '@components/input';
import Label from '@components/label';
import TextArea from '@components/text-area';
import styles from './add-comment.module.css';
import { addComment, commentsCacheKey } from '@/api-routes/comments';
import useSWRMutation from 'swr/mutation';

export default function AddComment({ id }) {
  const formRef = useRef(); // create a reference

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    commentsCacheKey,
    addComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const { username, comment } = Object.fromEntries(formData);

    const newComment = {
      username,
      comment,
      post_id: id,
    };
    const { status, error } = await addTrigger(newComment);
    // Reset the form after submission?
    formRef.current.reset();
  };

  return (
    <div className={styles.container}>
      <h2>Add a comment</h2>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor='username'>Author</Label>
          <Input id='username' name='username' />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor='comment'>Comment</Label>
          <TextArea id='comment' name='comment' />
        </div>

        <Button className={styles.addCommentButton} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
