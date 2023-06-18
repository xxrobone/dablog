import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import Comment from '../comment/comment';
import {
  addComment,
  getComments,
  commentsCacheKey,
} from '@/api-routes/comments';

// styles
import styles from './comments.module.scss';

const Comments = ({ slug, id }) => {
  commentsCacheKey;
  // if adding typescript useState<string>("")
  const [state, setState] = useState({
    username: '',
    comment: '',
  });

  const { data: { data: postComments = [] } = {} } = useSWR(
    id ? commentsCacheKey : null,
    () => getComments(id)
  );

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    commentsCacheKey,
    addComment
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  // if adding for type script e: ChangeEvent<HTMLInputElement>
  const handleOnSubmit = async (e, username, comment, id) => {
    e.preventDefault();
    const newComment = { username, comment, post_id: id };
    addTrigger(newComment);
   /*  isMutating(commentsCacheKey, [...postComments, newComment]); */
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
  /* useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id);

      if (error) {
        console.log(error, status);
      }
      console.log('data from supabase in api get comments: ', { data });
      if (data) {
        setPostComments(data);
      }
      return { data, error, status };
      const data = await getComments(id);
      if (data) {
        setPostComments(data);
      } else {
        setPostComments([]);
      }
    }; */
  /*   getData();
  }, [id]); */

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
        {/* {!postComments
          ? ''
          : postComments
              .sort((a, b) => {
                const aDate = new Date(a.created_at);
                const bDate = new Date(b.created_at);
                return +bDate - +aDate;
              })
              .map((c, i) => (
                <div
                  key={c.id + i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                >
                  <Comment {...c} slug={slug} />
                </div>
              ))} */}
        {(postComments ?? [])
          .sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            return bDate - aDate;
          })
          .map((c, i) => (
            <div
              key={c.id + i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              <Comment {...c} />
            </div>
          ))}
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
