'use client';
import React from 'react';
import useSWR from 'swr';
import { getPosts, cacheKey } from '@/api-routes/posts';
import { motion } from 'framer-motion';
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

// Tanken är att byta ut bilderna till blog posts, så man kan clicka sig till dom även från första sidan

const HomeGrid = () => {
  const { data: { data: posts = [] } = {} } = useSWR(cacheKey, getPosts);

  const arr1 = posts.slice(0, 3);

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
        {arr1.length > 0 ? (
          arr1.map((item) => (
            <div key={item.title}>
              <ImageWrapper {...item} />
            </div>
          ))
        ) : (
          <span></span>
        )}
        <p>They see me rollin they... <br/>sing it!</p>
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
    </motion.div>
  );
};

export default HomeGrid;
