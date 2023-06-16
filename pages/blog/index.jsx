import Link from 'next/link';
import Heading from '@components/heading';
/* import { supabase } from "../../lib/supabaseClient"; */
import useSWR from 'swr';
import { getPosts, cacheKey } from '@/api-routes/posts';
import { convertDate } from '@/utils/convertDate';
import BlogHeading from '@components/pageHeadings/blogHeading';

// styles
import styles from './blog.module.scss';
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 2 }}
      >
        {data &&
          data
            .sort((a, b) => {
              const aDate = new Date(a.created_at);
              const bDate = new Date(b.created_at);
              return +aDate - +bDate;
            })
            .map((post, i) => (
              <motion.div
                key={post.slug}
                /*  initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} */
                initial={{ opacity: 0, y: i % 1 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                whilehover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Link className={styles.link} href={`/blog/${post.slug}`}>
                  <div>
                    <p>{post.title}</p>
                    <time className={styles.date}>
                      {convertDate(post.created_at)}
                    </time>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.section>
    </div>
  );
}
