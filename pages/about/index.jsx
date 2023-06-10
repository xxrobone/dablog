import Heading from '@components/heading';
import { motion } from 'framer-motion';
import styles from './about.module.scss';
import AboutHeading from '../../components/pageHeadings/aboutHeading';

export default function About() {
  return (
    <div className={styles.about}>
      <Heading>
        <AboutHeading />
      </Heading>
      <motion.article
        className={styles.content_wrapper}
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <marquee bgcolor='#df5418' direction='left' width='65%'>
          Today best alterntive would be Keyframes, animejs or framer-motion...
        </marquee>
        <marquee>Sadly the marquee tag is deprecated...</marquee>
        <marquee direction='right' behavior='slide'>
          These animations are done with pure html
        </marquee>
        <marquee behavior='slide' direction='left'>
          that is pretty cool right?
        </marquee>
        <marquee scrollamount='10'>
          the development goes fast forward now
        </marquee>
        <marquee scrolldelay='200'>so much to learn</marquee>
        <marquee bgcolor='#df5418' width='50%'>
          100% coffee & code
        </marquee>
      </motion.article>
    </div>
  );
}
