import React from 'react';
import styles from './message.module.css';

const Message = ({ children }) => {
  return <p className={styles.message}></p>;
};

export default Message;
