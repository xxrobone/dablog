import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';

import styles from './searchBar.module.scss';

const SearchBar = ({ handleOnChange, handleOnSubmit, query = '' }) => {
  return (
    <form onSubmit={handleOnSubmit} id='form1' className={styles.search_bar}>
      <button className={styles.submit_btn} type='submit' form='form1'>
        <RiSearch2Line />
      </button>
      <input
        className={styles.input}
        type='text'
        placeholder='Search anything... '
        onChange={(e) => handleOnChange(e)}
        value={query}
      />
    </form>
  );
};

export default SearchBar;
