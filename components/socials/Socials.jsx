import React from 'react';
import { FiLinkedin, FiGithub, FiCodepen } from 'react-icons/fi';

// styles
import styles from './Socials.module.scss';

const Socials = () => {
  return (
    <div className={styles.socials}>
      <a
        href='https://www.linkedin.com/in/robert-w%C3%A4gar-1b4661139/'
        target='_blank'
        rel='noreferrer noopener'
      >
        {' '}
        <FiLinkedin className={`${styles.soc_item} ${styles.soc_icon}`} />
      </a>

      <a
        href='https://github.com/robonexx'
        target='_blank'
        rel='noreferrer noopener'
      >
        <FiGithub className={`${styles.soc_item} ${styles.soc_icon}`} />
      </a>
      <a
        href='https://codepen.io/robonexx'
        target='_blank'
        rel='noreferrer noopener'
      >
        <FiCodepen className={`${styles.soc_item} ${styles.soc_icon}`} />
      </a>
    </div>
  );
};

export default Socials;
