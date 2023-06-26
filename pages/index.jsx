import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Heading from '@components/heading';
/* import HomeGrid from '@components/homecontent/HomeGrid'; */
import useSWR from 'swr';
import { getPosts, cacheKey } from '@/api-routes/posts';
import { motion } from 'framer-motion';
import HomeHeading from '@components/pageHeadings/homeHeading';
// styles
import styles from './Homepage.module.scss';

// title for the posts, will create a separate component out of this!
const TitleEfx = (title) => {
  return (
    <>
      {title.split(' ').map((word, idx) => {
        return (
          <div key={idx} className={styles.word}>
            {word.split('').map((letter, i) => {
              return (
                <div
                  className={styles.letter}
                  key={i}
                  /*  ref={(el) => {
                  itemsRef.current[i] = el;
                }} */
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const Home = () => {
  const { data: { data: posts = [] } = {} } = useSWR(cacheKey, getPosts);

  return (
    <>
      <Head lang='en'>
        <title>Da Blog by Rob</title>
        <meta
          name='description'
          content='Blog project by Rob, assignment at cme educations, a blog using supabase and next.js amongts other libraries'
        />
        <meta property='og:title' content='Da blog by Rob' />
      </Head>
      <div className={styles.home}>
        <Heading>
          <HomeHeading />
        </Heading>
        {/*  <HomeGrid /> */}
       {/*  <h2 className={styles.latest}>Latest posts: </h2> */}
        <div className={`${styles.latest}`}>
          <h2 className={styles.sub_title}>
          <span className={`${styles.p} ${styles.first}`}>
            Check out the latest post right here!
          </span>
          <span className={`${styles.p} ${styles.second}`}>
            Check out the latest post right here!
          </span>
          </h2>
        </div>
        <div className={styles.container}>
          {posts.length > 0 ? (
            posts.map((item) => (
              <div className={styles.box} key={item.title}>
                <span className={styles.title}>{TitleEfx(item.title)}</span>
                {item.image ? (
                  <Image
                    className={styles.img}
                    alt={item.title}
                    src={item.image}
                    loading='lazy'
                    width={800}
                    height={400}
                  />
                ) : (
                  <span className={styles.emptyImg}>no img</span>
                )}
                <Link href={`/blog/${item.slug}`}></Link>
              </div>
            ))
          ) : (
            <span style={{ color: '#fafafa' }}>Loading...</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
