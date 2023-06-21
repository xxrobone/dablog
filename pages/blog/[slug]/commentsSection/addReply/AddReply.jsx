'use client';
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { addComment, commentsCacheKey } from '@/api-routes/comments';

import styles from './AddReply.module.scss';

const AddReply = ({ post_id, reply_to, setIsReply }) => {
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
  };

  const handleOnSubmit = async (e, username, comment, post_id, reply_to) => {
    e.preventDefault();
    e.stopPropagation();
    const newComment = { username, comment, post_id, reply_to };
    addTrigger(newComment);
    setState({
      username: '',
      comment: '',
    });
    setIsReply((prev) => !prev);
  };

  return (
    <div>
      <form
        onSubmit={(e) =>
          handleOnSubmit(e, state.username, state.comment, post_id, reply_to)
        }
        className={styles.reply_form}
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

export default AddReply;
