import BlogEditor from '@/components/blog-editor';
import { createSlug } from '@/utils/createSlug';
import { removeHTML } from '@/utils/removeHTML';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { addPost, cacheKey } from '@/api-routes/posts';
import { useRouter } from 'next/router';
import Message from '@/components/message';
import { useUser } from '@supabase/auth-helpers-react';

export default function CreatePost() {
  const [msg, setMsg] = useState(false);

  const user = useUser();

  const router = useRouter();
  const { trigger: addTrigger, isMutating } = useSWRMutation(cacheKey, addPost);

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    const newPost = {
      title: titleInput,
      slug: createSlug(titleInput),
      body: editorContent,
      user_id: user.id,
      image,
    };

    if (user) {
      addTrigger(newPost);
      console.log('post created successfully');
      setMsg((prev) => !prev);
      setTimeout(() => {
        setMsg(false);
      }, 1990);
      setTimeout(() => {
        router.push('/blog');
      }, 2000);
    } else {
      console.log('no user authenticated, can´t post');
    }
  };

  return (
    <>
      <BlogEditor
        heading='Create post'
        onSubmit={handleOnSubmit}
        buttonText='Upload post'
      />
      {msg ? <Message>Post created successfully</Message> : null}
    </>
  );
}
