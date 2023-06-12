import { useState } from 'react';
import { useRouter } from 'next/router';
import BlogEditor from '@/components/blog-editor';
import Message from '@components/message';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPost, updatePost, cacheKey } from '@/api-routes/posts';
import { createSlug } from '@/utils/createSlug';
import { removeHTML } from '@/utils/removeHTML';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const mockData = {
  title: 'Community-Messaging Fit',
  body: '<p>This is a good community fit!</p>',
  image:
    'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
};
export default function EditBlogPost() {
  const [msg, setMsg] = useState(false);
  const router = useRouter();

  const { trigger: updateTrigger, isMutating } = useSWRMutation(
    cacheKey,
    updatePost
  );

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data: { data = [] } = {} } = useSWR(
    slug ? `${cacheKey}${slug}/edit` : null,
    () => getPost({ slug })
  );

  const { title, body, id } = data;

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    console.log('from submit', titleInput, editorContent, id);
    const newSlug = await titleInput;
    const slug = createSlug(newSlug);
    const title = titleInput;
    const newBody = await editorContent;
    const body = removeHTML(newBody);

    console.log({ title, slug, body, id });
    const editedPost = { title, slug, body, id };
    updateTrigger(editedPost);
    setMsg((prev) => !prev);
    setTimeout(() => {
      setMsg(false);
    }, 1990);
    setTimeout(() => {
      router.push('/blog');
    }, 2000);
  };

  // for the inpust and id

  return (
    <>
      <BlogEditor
        heading='Edit blog post'
        title={title}
        src={mockData.image}
        alt={title}
        content={body}
        buttonText='Save changes'
        onSubmit={handleOnSubmit}
      />
      {msg ? <Message>Post updated successfully</Message> : null}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);

  const { slug } = ctx.params;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('posts')
    .select()
    .single()
    .eq('slug', slug);

  console.log(session);

  const isUser = data.user_id === session.user.id;

  console.log(isUser);

  if (!isUser) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
