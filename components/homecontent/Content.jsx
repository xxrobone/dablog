'use client';
import React from 'react';
import Btn from '../buttons/Btn';
import { motion } from 'framer-motion';

// styles
import styles from './Content.module.scss';

const Variants = {
  open: {
    marginTop: 0,
    transition: {
      duration: 1,
      delay: 3,
    },
  },
  closed: {
    marginTop: '100svh',
  },
};

const Content = () => {
  return (
    <motion.div
      className={styles.content_wrapper}
      variants={Variants}
      initial='closed'
      animate='open'
    >
      <h2>Hi there,</h2>
      <section className={`${styles.section} ${styles.top}`}>
        <p>
          I&apos;m a developer with focus on creating smart user interfaces &
          useful interactions
          <br />
          <br />
          My design is equally about what it does as much as how it attracts the
          eye
        </p>
        <p>
          If you are looking for a developer to bring your ideas to life, You
          have come to the right place <br />
          <br />
          As a developer I &apos; m focused on finding the best solutions for
          you problems/ needs by developing rich web experiences & applications
          for your users
          <br />
        </p>
      </section>
      <Btn />
    </motion.div>
  );
};

export default Content;
