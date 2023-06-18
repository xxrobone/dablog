import { useState } from 'react';
import { useRouter } from 'next/router';
import BlogEditor from '@/components/blog-editor';
import Message from '@components/message';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPost, updatePost, cacheKey } from '@/api-routes/posts';
import { createSlug } from '@/utils/createSlug';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default function EditBlogPost() {
  const [msg, setMsg] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const { trigger: updateTrigger, isMutating } = useSWRMutation(
    cacheKey,
    updatePost
  );

  const { data: { data: post = {} } = {} } = useSWR(
    slug ? `${cacheKey}${slug}` : null,
    () => getPost({ slug })
  );

  const { title, body, id } = post;

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    console.log('from submit', titleInput, editorContent, id);
    const newSlug = createSlug(slug);

    const editedPost = {
      title: titleInput,
      slug: newSlug,
      body: editorContent,
      image,
      id,
    };

    updateTrigger(editedPost);
    setMsg((prev) => !prev);
    setTimeout(() => {
      setMsg(false);
    }, 1990);
    setTimeout(() => {
      router.push(`/blog/${newSlug}`);
    }, 2000);
  };

  return (
    <>
      <BlogEditor
        heading='Edit blog post'
        title={title}
        src={post?.image}
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
