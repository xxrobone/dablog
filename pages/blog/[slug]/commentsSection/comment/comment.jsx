import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  editComment,
  deleteComment,
  commentsCacheKey,
  getReplies,
} from '@/api-routes/comments';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useUser } from '@supabase/auth-helpers-react';
import { timeAgo } from '@/utils/timeAgo';

// components
import Button from '@/components/button';
import { useRef } from 'react';

// styles
import styles from './comment.module.scss';
import AddReply from '../addReply/AddReply';

const Comment = ({ username, comment, created_at, id, slug, post_id }) => {
  const [editedComment, setEditedComment] = useState({
    id: '',
    body: '',
  });
  const [isReply, setIsReply] = useState(false);
  const formRef = useRef();

  const { data: { data: replies = [] } = {}, error } = useSWR(
    id ? commentsCacheKey : null,
    () => getReplies(id)
  );

  const user = useUser();
  const router = useRouter();

  const { trigger: updateTrigger } = useSWRMutation(
    commentsCacheKey,
    editComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { trigger: deleteTrigger } = useSWRMutation(
    commentsCacheKey,
    deleteComment,
    {
      onError: (error) => {
        console.log(error);
      },
    }
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

  const handleDelete = async (id) => {
    console.log('ID from handle delete: ', id);
    /* const ok = window.confirm('Delete comment?'); */
    // if (ok) {
    const { data, error } = await deleteTrigger(id);
    console.log(id);
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
          <div>
            <h4>{username}</h4>
            <p className={styles.timestamp}>{timeAgo(created_at)}</p>
            <p className='font-light'>{comment}</p>
            {/* reply button */}
            <p
              className={styles.reply}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                console.log('reply?');
                setIsReply((prev) => !prev);
              }}
            >
              reply
            </p>
            {isReply ? (
              <>
                  <AddReply post_id={post_id} reply_to={id} setIsReply={setIsReply} />
              </>
            ) : (
              <span></span>
            )}
            <section>
              {replies &&
                replies
                  .filter((reply) => reply.reply_to === id)
                  .map((r) => (
                    <div key={r.id} className={styles.comment_reply}>
                      <h4>- {r.username}</h4>
                      <p className={styles.timestamp}>{timeAgo(r.created_at)}</p>
                      <p className={''}>{r.comment}</p>
                      <Button
                        type='button'
                        onClick={() => handleDelete(r.id)}
                        className=''
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
            </section>
          </div>
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
                <Button type='button' onClick={() => handleDelete(id)} className=''>
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
