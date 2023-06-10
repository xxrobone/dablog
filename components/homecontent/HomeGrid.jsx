'use client';
import React from 'react';
import { motion } from 'framer-motion';
import IMG1 from '/public/images/coffee.jpg';
import IMG2 from '/public/images/knowledge.jpg';
import IMG3 from '/public/images/casette.jpg';
import IMG4 from '/public/images/rainy.jpg';
import IMG5 from '/public/images/acecards.jpg';
import IMG6 from '/public/images/street.jpg';
import IMG7 from '/public/images/disconnected.jpg';
import ImageWrapper from '../ImageWrapper/ImageWrapper';
// styles
import styles from './HomeGrid.module.scss';

const Variants = {
  open: {
    y: 0,
    transition: {
      duration: 1.5,
      delay: 4,
    },
  },
  closed: {
    y: 1500,
  },
};

const imgData = [
  {
    id: 1,
    img: IMG1,
    title: 'Coffee',
    desc: '& Code',
  },
  {
    id: 2,
    img: IMG2,
    title: 'Knowledge',
    desc: 'is power',
  },
  {
    id: 3,
    img: IMG3,
    title: 'Music',
    desc: 'is life',
  },
];
const imgData2 = [
  {
    id: 5,
    img: IMG4,
    title: 'Rain',
    desc: 'fresh air',
  },
  {
    id: 6,
    img: IMG5,
    title: 'Ace Duce',
    desc: 'got the props',
  },
  {
    id: 7,
    img: IMG6,
    title: 'Big City',
    desc: 'streets',
  },
  {
    id: 8,
    img: IMG7,
    title: 'Disconnected',
    desc: 'from the matrix',
  },
];

// Tanken är att byta ut bilderna till blog posts, så man kan clicka sig till dom även från första sidan

const HomeGrid = () => {
  return (
    <motion.div
      className={styles.content_wrapper}
      variants={Variants}
      initial='closed'
      animate='open'
    >
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
      <section className={`${styles.section} ${styles.even}`}>
        {imgData.map((img) => (
          <div key={img.id}>
            <ImageWrapper {...img} />
          </div>
        ))}
      </section>
      <section className={`${styles.section} ${styles.clr}`}>
        <p>
          I think the creative side of people is what will matter when we need
          to solve our problems
          <br />
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          iusto quibusdam temporibus porro laboriosam culpa, eaque nemo nulla
          corrupti soluta.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, earum.{' '}
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          delectus inventore in assumenda minima ea quaerat, incidunt, excepturi
          odit tempora, porro nam veritatis harum quam sequi enim earum
          consequatur officia est voluptates molestias quidem sapiente saepe.
          Enim quisquam consequuntur commodi.
          <br />
        </p>
      </section>
      <section className={`${styles.section} ${styles.slow}`}>
        {imgData2.map((img) => (
          <div key={img.id}>
            <ImageWrapper {...img} />
          </div>
        ))}
      </section>
    </motion.div>
  );
};

export default HomeGrid;
