import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import styles from './blog-post.module.scss';
/* import Comments from './partials/comments';
import AddComment from './partials/add-comment'; */
import Button from '@components/button';
import Heading from '@components/heading';
import BlogImageBanner from '@components/blog-image-banner';
import Message from '@components/message';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPost, cacheKey, deletePost } from '@/api-routes/posts';
import { convertDate } from '@/utils/convertDate';
import { timeAgo } from '@/utils/timeAgo';
import Comments from './commentsSection/comments/comments';

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

  console.log(post);

  const { title, body, created_at, id } = post;

  const handleDeletePost = async () => {
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
      <section className={styles.container}>
        <h2>{title}</h2>
        {post?.image && <BlogImageBanner src={image} alt={title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{convertDate(created_at)}</time>{' '}
          <span>&nbsp;&nbsp;</span>
          <time className={styles.date}>
            Post created: {timeAgo(created_at)}
          </time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        {post?.author && (
          <span className={styles.author}>Author: {post.author}</span>
        )}

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}

        {user ? (
          <div className={styles.buttonContainer}>
            <Button onClick={() => handleDeletePost(id)}>Delete</Button>
            <Button onClick={handleEditPost}>Edit</Button>
          </div>
        ) : (
          ''
        )}

        {msg ? <Message>Post deleted successfully</Message> : null}
      </section>

      <Comments slug={slug} id={id} />
      {/* <Comments postId={post.id} /> */}

      {/* This component should only be displayed if a user is authenticated */}
      {/*  <AddComment postId={post.id} /> */}
    </>
  );
}
