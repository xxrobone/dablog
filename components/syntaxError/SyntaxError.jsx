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
      <motion.p
        className={styles.user_error}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: [1, 0], height: 100 }}
        transition={{ delay: 1.6, duration: 1.2 }}
      >
        SYNTAX ERROR!
      </motion.p>
      <motion.p
        className={styles.user_error}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 100 }}
        transition={{ delay: 3, duration: 1.2 }}
      >
        Dont get stressed Its not a hack <br />
        izz a joke
      </motion.p>
    </div>
  );
};

export default SyntaxError;
