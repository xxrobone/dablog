import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import CommentList from '../commentList/commentList';
import Comment from '../comment/comment';
import { addComment, getComments, editComment } from '@/api-routes/comments';
// styles
import styles from './comments.module.scss';

const cacheKey = '/api/blog';

const Comments = ({ slug, id }) => {
  // if adding typescript useState<string>("")
  const [state, setState] = useState({
    username: '',
    comment: '',
  });
/*   const [editComment, setEditComment] = useState({
    id: "",
    body: "",
  }); */

  console.log('the post id: ', id);

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    `${cacheKey}${slug}`,
    addComment
  );

  /* const { trigger: updateTrigger } = useSWRMutation(
    `${cacheKey}${slug}`,
    editComment
  ); */

  // gettind the comment by sending the id for the post as a parameter
  // the post id is connected to the  comments done with the post_id in the comments
  const { data: { data = [] } = {} } = useSWR(
    slug ? `${cacheKey}${slug}` : null,
    () => getComments({ id })
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
    console.log(state);
  };

  // if adding for type script e: ChangeEvent<HTMLInputElement>
  const handleOnSubmit = async (e, username, comment, id) => {
    e.preventDefault();
    const newComment = { username, comment, post_id: id };
    addTrigger(newComment);
    console.log('comment added to supabase, success: ', username, comment, id);
    setState({
      username: '',
      comment: '',
    });
  };

  // edit change handler
  /* const onChangeEditComment = (e) => {
    const comment = e.target.value;
    setEditComment({ ...editComment, comment });
  };
 */
  // confirming edit
  /* const confirmEdit = () => {
    window.alert("Confirm edit comment");
    updateTrigger(editComment);
  }; */

  return (
    <div className={styles.comments_wrapper}>
      <form
        onSubmit={(e) => handleOnSubmit(e, state.username, state.comment, id)}
        className={styles.comments_form}
      >
        <input
          type='text'
          name='username'
          placeholder='Add Username'
          onChange={handleChange}
          value={state.username}
        />
        <input
          type='text'
          name='comment'
          placeholder='Add a comment'
          onChange={handleChange}
          value={state.comment}
        />
        <button type='submit'>Submit</button>
      </form>
      <ul className={styles.comment_list}>
      <h2>Comments ;)</h2>
        {data
          ? data.map((c) => (
              <div key={c.id}>
              <Comment {...c} slug={slug} />
              
              </div>
            ))
          : ''}
      </ul>
    {/*   <div className={styles.edit_section}>
            {comment.id === editComment.id ? (
              <input
                type="text"
                value={editComment.body}
                onChange={onChangeEditComment}
                className=""
              />
            ) : (
              <p className="font-light">{state.comment}</p>
            )}
            {editComment.id === comment.id ? (
              <div className="">
                <button type="button" onClick={confirmEdit} className="0">
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setEditComment({ id: "", payload: "" })}
                  className=""
                >
                  Cancel
                </button>
              </div>
        ) : (
            <>
              <button
                type="button"
                onClick={() => setEditComment({ id: comment.id, payload: comment.body })}
                className=""
              >
                Edit
            </button>
             <button type="button" onClick={() => confirmDelete(comment.id)} className="">
             Delete
              </button>
              </>
            )}
    </div> */}
    </div>
  );
};

export default Comments;

/* 
if sorting comments...
.sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            return +aDate - +bDate;
          })
*/
