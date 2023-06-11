import {useState} from 'react'
import { editComment, deleteComment } from '@/api-routes/comments';
import { cacheKey } from '@/api-routes/posts';
import useSWRMutation from 'swr/mutation';
// styles
import styles from './comment.module.scss';
const Comment = ({ username, comment, time, id, slug }) => {
  const [editedComment, setEditedComment] = useState({
    id: "",
    body: "",
  });

  const { trigger: updateTrigger } = useSWRMutation(
    `${cacheKey}${slug}`,
    editComment
  );

  const { trigger: deleteTrigger } = useSWRMutation(
    `${cacheKey}${slug}`,
    deleteComment
  );
    // edit change handler
    const onChangeEditComment = (e) => {
      const comment = e.target.value;
      setEditedComment({ ...editedComment, comment });
    };
  
    // confirming edit
    const confirmEdit = () => {
      window.alert("Confirm edit comment");
      updateTrigger(editedComment);
  };
  
  const handleDeleteComment = (id) => {
    console.log('ID from handle delete: ', id)
    const ok = window.confirm("Delete comment?");
    if (ok) {
      /* deleteComment(id) */
    }
  }
  
  
  return (
  <div className={styles.comment}>
    {/* <h4>{username} says</h4>
    <p className={styles.timestamp}>{time}</p>
    <p>{comment}</p> */}
    <div className={styles.edit_section}>
            {id === editedComment.id ? (
              <input
                type="text"
                value={editedComment.body}
                onChange={onChangeEditComment}
                className=""
              />
            ) : (
              <p className="font-light">{comment}</p>
            )}
            {editedComment.id === id ? (
              <div className="">
                <button type="button" onClick={confirmEdit} className="0">
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setEditedComment({ id: "", body: "" })}
                  className=""
                >
                  Cancel
                </button>
              </div>
        ) : (
            <>
              <button
                type="button"
                onClick={() => setEditComment({ id: id, body: comment })}
                className=""
              >
                Edit
            </button>
             <button type="button" onClick={() => handleDeleteComment(id)} className="">
             Delete
              </button>
              </>
            )}
    </div>
  </div>
)
};

export default Comment;
