import React from 'react';
import Image from 'next/image';
import GIF from '/public/images/syntaxErr.gif';
import { motion } from 'framer-motion';
import styles from './SyntaxError.module.scss';

const SyntaxError = () => {
  return (
    <div className={styles.syntax_error}>
      <Image
        src={GIF}
        priority
        height={360}
        width={360}
        alt={`syntax error`}
        unoptimized={true}
      />
      <motion.span
        className={styles.user_error}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: [1, 0], height: 100 }}
        transition={{ delay: 1.6, duration: 1.2 }}
      >
        Anonymous User!
      </motion.span>
      <motion.span
        className={styles.user_error}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 100 }}
        transition={{ delay: 3, duration: 1.2 }}
      >
        Unable to delete!!! Not Logged in
      </motion.span>
    </div>
  );
};

export default SyntaxError;
