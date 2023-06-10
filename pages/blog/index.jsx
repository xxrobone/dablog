import Link from 'next/link';
import styles from './blog.module.css';
import Heading from '@components/heading';
/* import { supabase } from "../../lib/supabaseClient"; */
import useSWR from 'swr';
import { getPosts, cacheKey } from '../../api-routes/posts';
import { convertDate } from '../../utils/convertDate';
import BlogHeading from '../../components/pageHeadings/blogHeading';
import { motion } from 'framer-motion';

/* const mockData = [
  {
    id: "123",
    title: "Community-Messaging Fit",
    slug: "community-messaging-fit",
    createdAt: "2022-02-15",
    body: "<p>This is a good community fit!</p>",
  },
  {
    id: "1234",
    title: "Why you should use a react framework",
    slug: "why-you-should-use-react-framework",
    createdAt: "2022-02-12",
    body: "<p>This is a good community fit!</p>",
  },
]; */

export default function Blog() {
  const { data: { data = [] } = {} } = useSWR(cacheKey, getPosts);

  /* const { data: posts } = await supabase.from('posts').select('*');

  console.log(posts) */

  return (
    <div className={styles.blog}>
      <Heading>
        <BlogHeading />
      </Heading>
      <motion.section
        className={styles.container}
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        {data &&
          data.map((post) => (
            <Link
              key={post.slug}
              className={styles.link}
              href={`/blog/${post.slug}`}
            >
              <div className='w-full flex flex-col'>
                <p>{post.title}</p>
                <time className={styles.date}>
                  {convertDate(post.created_at)}
                </time>
              </div>
            </Link>
          ))}
      </motion.section>
    </div>
  );
}
