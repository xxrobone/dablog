import { useRouter } from 'next/router';
import styles from './blog-post.module.css';
import Comments from './partials/comments';
import AddComment from './partials/add-comment';
import Button from '@components/button';
import Heading from '@components/heading';
import BlogImageBanner from '@components/blog-image-banner';
import useSWR from 'swr';
import { getPost, cacheKey } from '../../../api-routes/posts';

const post = {
  id: '1234',
  title: 'Why you should use a react framework',
  author: 'John Doe',
  slug: 'why-you-should-use-react-framework',
  createdAt: '2022-02-12',
  body: `
  <p>With the History extension the Editor will keep track of your changes. And if you think you made a mistake, you can redo your changes. Try it out, change the content and hit the undo button!</p>
  <p>And yes, you can also use a keyboard shortcut to undo changes (Control/Cmd Z) or redo changes (Control/Cmd Shift Z).</p>
  <p>Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.</p>
  <p>By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.</p>
  <p><strong>This is bold.</strong></p>
  <p><u>This is underlined though.</u></p>
  <p><em>This is italic.</em></p>
  <p><s>But that’s striked through.</s></p>
  <p><code>This is code.</code></p>
  `,
};

export default function BlogPost() {
  /*  const { data: { data = [] } = {} } = useSWR(cacheKey, getPost);

  const post = data */

  const router = useRouter();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const handleDeletePost = () => {
    console.log({ id: post.id });
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  return (
    <>
      <section className={styles.container}>
        <Heading>{post.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <span className={styles.author}>Author: {post.author}</span>

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div>
      </section>

      <Comments postId={post.id} />

      {/* This component should only be displayed if a user is authenticated */}
      <AddComment postId={post.id} />
    </>
  );
}
