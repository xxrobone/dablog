import React from 'react';

// styles
import styles from './commentList.module.scss';

const CommentList = (props) => {
  return <ul className={styles.comment_list}>{props.children}</ul>;
};

export default CommentList;
