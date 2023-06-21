'use client';
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { addComment, commentsCacheKey } from '@/api-routes/comments';

import styles from './AddComment.module.scss';

const AddComment = ({ id }) => {
  const [state, setState] = useState({
    username: '',
    comment: '',
  });

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

    console.log(state);
  };

  const handleOnSubmit = async (e, username, comment, id) => {
    e.preventDefault();
    const newComment = { username, comment, post_id: id };
    const { status, error } = await addTrigger(newComment);
    setState({
      username: '',
      comment: '',
    });
    /* setAdd(!add); */
  };

  return (
    <div>
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
    </div>
  );
};

export default AddComment;
