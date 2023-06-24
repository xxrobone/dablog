import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@components/heading';
/* import HomeGrid from '@components/homecontent/HomeGrid'; */
import useSWR from 'swr';
import { getPosts, cacheKey } from '@/api-routes/posts';
import { motion } from 'framer-motion';
import HomeHeading from '@components/pageHeadings/homeHeading';
// styles
import styles from './Homepage.module.scss';

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
        <div className={styles.container}>
          {posts.length > 0 ? (
            posts.map((item) => (
              <div className={styles.box} key={item.title}>
                <span className={styles.title}>{item.title}</span>
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
            <span></span>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
