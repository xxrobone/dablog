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
const CommentReply = ({
  username,
  comment,
  created_at,
  id,
  slug,
  user_id,
  reply_to,
}) => {
  const [editedComment, setEditedComment] = useState({
    id: '',
    body: '',
  });
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
    e.stopImmidatePropagation();
    console.log('ID from handle delete: ', id);
    /* const ok = window.confirm('Delete comment?'); */
     if (user === user_id) {
    deleteTrigger(id);
     } else {
       console.log('you are not the user')
     }
  };

  return (
    <div className={`${styles.comment}${styles.reply}`}>
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
            <h4>{username}</h4>
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
                  onMouseEnter={() => console.log('mouse')}
                  onMouseLeave={() => console.log}
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
      <span
        className={styles.reply}
        onClick={() => {
          console.log('reply?');
        }}
      >
        reply
      </span>
    </div>
  );
};

export default CommentReply;
