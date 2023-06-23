'use client';
/* import React, { useState, useEffect } from 'react'; */
import Image from 'next/image';
import LogoImg from '/public/images/robIcon.png';
import { motion } from 'framer-motion';
import styles from './logo.module.scss';

const textContent = ['hello', 'terve', 'hola', 'hej'];

const Logo = () => {
  /* const [index, setIndex] = useState(0); */

  /* const nextText = () => {
    textContent.map((t) => {
      setTimeout(() => {
        if (index <= textContent.length - 1) {
          setIndex(index + 1);
          console.log(index);
        } else {
          setIndex(0);
        }
      }, 2000);
    });
  };

  nextText(); */

  return (
    <motion.div
      className={styles.logo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.8, duration: 0.6 }}
    >
      <p className={`${styles.logo_text} `}>hello</p>
      <Image className={styles.rob_png} fill src={LogoImg} alt='robert wagar' />
    </motion.div>
  );
};

export default Logo;
