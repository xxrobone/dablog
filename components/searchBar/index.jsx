import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { motion } from 'framer-motion';

import styles from './searchBar.module.scss';

const SearchBar = ({ handleOnChange, handleOnSubmit, query = '' }) => {
  return (
    <motion.form
      onSubmit={handleOnSubmit}
      id='form1'
      className={styles.search_bar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0, duration: 0.6 }}
    >
      <motion.button
        className={styles.submit_btn}
        type='submit'
        form='form1'
        initial={{ x: 300, position: 'absolute', opacity: 0 }}
        animate={{ x: 0, position: 'relative', opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        onTap={handleOnSubmit}
      >
        <RiSearch2Line />
      </motion.button>
      <motion.input
        className={styles.input}
        type='text'
        placeholder='Search anything... '
        onChange={(e) => handleOnChange(e)}
        value={query}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </motion.form>
  );
};

export default SearchBar;
