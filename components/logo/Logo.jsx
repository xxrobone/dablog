'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import LogoImg from '/public/images/robIcon.png';
import { motion } from 'framer-motion';
import styles from './logo.module.scss';

const textContent = [
  {
    text: 'Hello',
  },
  {
    text: 'Hola',
  },
  {
    text: 'Terve',
  },
  {
    text: 'Tjena',
  },
];

const Logo = () => {


  return (
    <motion.div
      className={styles.logo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.8, duration: 0.6 }}
    >
      <p className={`${styles.logo_text} `}>
        hello
      </p>
      <Image className={styles.rob_png} fill src={LogoImg} alt='robert wagar' />
    </motion.div>
  );
};

export default Logo;
