import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import styles from './blog-post.module.scss';
import Button from '@components/button';
import BlogImageBanner from '@components/blog-image-banner';
import Message from '@components/message';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPost, cacheKey, deletePost } from '@/api-routes/posts';
import { convertDate } from '@/utils/convertDate';
import { timeAgo } from '@/utils/timeAgo';
import { removeHTML } from '@/utils/removeHTML';
import Comments from './commentsSection/comments/comments';
import AddComment from './commentsSection/addComment/AddComment';

export default function BlogPost() {
  const [msg, setMsg] = useState(false);
  const user = useUser();

  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const { trigger: deleteTrigger, isMutating } = useSWRMutation(
    cacheKey,
    deletePost,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data: { data: post = {} } = {} } = useSWR(
    slug ? `${cacheKey}${slug}` : null,
    () => getPost({ slug })
  );

  const { title, body, created_at, id, image, user_id } = post;

  const handleDeletePost = async (id) => {
    /*  deletePost({ id }); */
    const postID = await id;
    console.log('delete id:', postID);
    const { status, error } = await deleteTrigger(postID);

    if (!error) {
      setMsg((prev) => !prev);
      setTimeout(() => {
        setMsg(false);
      }, 1990);
      setTimeout(() => {
        router.push('/blog');
      }, 2000);
    } else {
      console.log(error);
    }
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  return (
    <>
      <Head lang='en'>
        <title>Da Blog - {title}</title>
        {/* Creating a little excerpt from the body :D and removing html */}
        <meta
          name='description'
          content={body ? removeHTML(body).split(' ', 6).join(' ') + '...' : ''}
        />
        <meta property='og:title' content='Da blog by Rob' />
      </Head>
      <section className={styles.container}>
        <h2>{title}</h2>
        {post?.image && <BlogImageBanner src={image} alt={title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{convertDate(created_at)}</time>{' '}
          <span>&nbsp;&nbsp;</span>
          <time className={styles.date}>
            Post created: <br />
            {timeAgo(created_at)}
          </time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        {post?.author && (
          <span className={styles.author}>Author: {post.author}</span>
        )}
        {user ? (
          <>
            <div className={styles.buttonContainer}>
              {user.id === user_id ? (
                <>
                  <Button onClick={() => handleDeletePost(id)}>Delete</Button>
                  <Button onClick={handleEditPost}>Edit</Button>
                </>
              ) : (
                ''
              )}
            </div>
            {msg ? <Message>Post deleted successfully</Message> : null}
          </>
        ) : (
          <span></span>
        )}
      </section>
      <AddComment id={id} />
      <Comments slug={slug} id={id} />
    </>
  );
}
