import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  editComment,
  deleteComment,
  commentsCacheKey,
} from '@/api-routes/comments';
import useSWRMutation from 'swr/mutation';
import { useUser } from '@supabase/auth-helpers-react';
import { timeAgo } from '@/utils/timeAgo';

import Button from '@/components/button';
// styles
import styles from './comment.module.scss';
const Comment = ({ username, comment, created_at, id, slug }) => {
  const [editedComment, setEditedComment] = useState({
    id: '',
    body: '',
  });
  /* const [confirm, setConfirm] = useState(false); */

  const user = useUser();
  const router = useRouter();

  const { trigger: updateTrigger } = useSWRMutation(
    commentsCacheKey,
    editComment
  );

  const { trigger: deleteTrigger } = useSWRMutation(
    commentsCacheKey,
    deleteComment
  );
  // edit change handler
  const onChangeEditComment = (e) => {
    const body = e.target.value;
    setEditedComment({ ...editedComment, body });
    /* console.log('from change', editedComment.body, editedComment.id); */
  };

  // confirming edit
  const confirmEdit = async () => {
    /* console.log('Confirm edit comment', editedComment.body, editedComment.id); */
    const edited = {
      comment: editedComment.body,
      id: editedComment.id,
    };
    if (user) {
      updateTrigger(edited);
      setTimeout(() => {
        setEditedComment({ id: '', body: '' });
        router.push(`/blog/${slug}`);
      }, 2000);
    }
  };

  const handleDeleteComment = async () => {
    console.log('ID from handle delete: ', id);
    /* const ok = window.confirm('Delete comment?'); */

    // if (ok) {
    deleteTrigger(id);
    // }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.edit_section}>
        {id === editedComment.id ? (
          <input
            type='text'
            value={editedComment.body}
            onChange={onChangeEditComment}
            className={styles.edit_comment}
          />
        ) : (
          <>
            <h4>{username} says</h4>
            <p className={styles.timestamp}>{timeAgo(created_at)}</p>
            <p className='font-light'>{comment}</p>
          </>
        )}
        {editedComment.id === id ? (
          <div className={styles.button_section}>
            <Button type='button' onClick={confirmEdit} className=''>
              Confirm
            </Button>
            <Button
              type='button'
              onClick={() => setEditedComment({ id: '', body: '' })}
              className=''
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className={styles.button_section}>
            {user ? (
              <>
                <Button
                  type='button'
                  onClick={() => setEditedComment({ id: id, body: comment })}
                  className=''
                >
                  Edit
                </Button>
                <Button
                  type='button'
                  onClick={handleDeleteComment}
                  className=''
                >
                  Delete
                </Button>
              </>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
      {/* <div>
        <p>Shure you want to delete?</p>
        <button onClick={() => setConfirm(true)}>yes</button>
        <button onClick={() => setConfirm(false)}>No</button>
      </div> */}
    </div>
  );
};

export default Comment;
