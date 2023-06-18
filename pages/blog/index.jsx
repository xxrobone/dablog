import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Heading from '@components/heading';
/* import { supabase } from "../../lib/supabaseClient"; */
import useSWR from 'swr';
import { getPosts, cacheKey } from '@/api-routes/posts';
import { convertDate } from '@/utils/convertDate';
import BlogHeading from '@components/pageHeadings/blogHeading';
import SearchBar from '@/components/searchBar';
import { filteredPosts } from '@/utils/filteredPosts';
// styles
import styles from './blog.module.scss';
import { motion } from 'framer-motion';

export default function Blog() {
  const [query, setQuery] = useState('');
  const [p, setP] = useState([]);
  const { data: { data: posts = [] } = {} } = useSWR(cacheKey, getPosts);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    const filtered = await filteredPosts(query, p);

    setP(filtered);
  };

  const handleOnChange = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  console.log(posts);
  /*   console.log(filtered); */

  useEffect(() => {
    setP(posts);
  }, [posts]);

  return (
    <div className={styles.blog}>
      <Heading>
        <BlogHeading />
      </Heading>
      <section className={styles.search_wrapper}>
        <SearchBar
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          setQuery={setQuery}
          query={query}
        />
      </section>
      <motion.section
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 2 }}
      >
        {p &&
          p
            .sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              return bDate - aDate;
            })
            .map((post, i) => (
              <motion.div
                key={post.slug}
                className={styles.link_wrapper}
                /*  initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} */
                initial={{ opacity: 0, y: i % 1 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              >
                <Link className={styles.link} href={`/blog/${post.slug}`}>
                  <div>
                    <p>{post.title}</p>
                    <div className={styles.bottom_row}>
                      <time className={styles.date}>
                        {convertDate(post.created_at)}
                      </time>
                      {post?.author && (
                        <span className={styles.author}>
                          Written by: {post.author}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.section>
    </div>
  );
}
