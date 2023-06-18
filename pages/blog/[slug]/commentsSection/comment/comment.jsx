import { useState } from 'react';
import { editComment, deleteComment, commentsCacheKey } from '@/api-routes/comments';
import { cacheKey } from '@/api-routes/posts';
import useSWRMutation from 'swr/mutation';
import { useUser } from '@supabase/auth-helpers-react';
import { timeAgo } from '@/utils/timeAgo';

import Button from '@/components/button';
// styles
import styles from './comment.module.scss';
const Comment = ({ username, comment, created_at, id }) => {
  const [editedComment, setEditedComment] = useState({
    id: '',
    body: '',
  });

  const user = useUser();

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
    const comment = e.target.value;
    setEditedComment({ ...editedComment, comment });
  };

  // confirming edit
  const confirmEdit = () => {
    window.alert('Confirm edit comment');
    updateTrigger(editedComment);
  };

  const handleDeleteComment = async () => {
    console.log('ID from handle delete: ', id);
    const ok = window.confirm('Delete comment?');

    if (ok) {
      deleteTrigger(id);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.edit_section}>
        {id === editedComment.id ? (
          <input
            type='text'
            value={editedComment.body}
            onChange={onChangeEditComment}
            className=''
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
            <Button type='button' onClick={confirmEdit} className='0'>
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
                  onClick={() => setEditComment({ id: id, body: comment })}
                  className=''
                  disabled
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
    </div>
  );
};

export default Comment;
