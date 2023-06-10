import Heading from '@components/heading';
import HomeGrid from '@components/homecontent/HomeGrid';
import HomeHeading from '@components/pageHeadings/homeHeading';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
// styles

export default function Home() {
  const [isVisible, setIsVisibe] = useState(true);

  setTimeout(() => {
    setIsVisibe(false);
  }, 2800);
  return (
    <AnimatePresence>
      <Heading>
        <HomeHeading />
      </Heading>
      <HomeGrid />
    </AnimatePresence>
  );
}
