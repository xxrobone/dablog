import Heading from '@components/heading';
import Hero from '@components/hero/Hero';
import HomeGrid from '@components/homecontent/HomeGrid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
// styles
import styles from '@components/hero/Hero.module.scss';

export default function Home() {
  const [isVisible, setIsVisibe] = useState(true);

  setTimeout(() => {
    setIsVisibe(false);
  }, 2800);
  return (
    <AnimatePresence>
      <Heading>Home</Heading>
      {isVisible ? (
        <motion.div
          key='hero'
          className={styles.hero}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
          exit={{ y: -500, x: -600, opacity: 0, scale: 0.5 }}
        >
          <Hero isVisible={isVisible} setIsVisibe={setIsVisibe} />
        </motion.div>
      ) : (
        ''
      )}
    </AnimatePresence>
  );
}
