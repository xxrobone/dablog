import { useState } from 'react';
import { useRouter } from 'next/router';
import BlogEditor from '../../../../components/blog-editor';
import Message from '@components/message';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPost, updatePost } from '../../../../api-routes/posts';

const editCacheKey = '/api/edit';

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
    editCacheKey,
    updatePost
  );

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data: { data = [] } = {} } = useSWR(
    slug ? `${editCacheKey}${slug}` : null,
    () => getPost({ slug })
  );


  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    console.log({ editorContent, titleInput, image, slug });
    const slug = createSlug(titleInput);
    const title = titleInput;
    const body = editorContent.replaceAll(/<\/?[^>]+(>|$)/gi, '');

    const newPost = { title, slug, body };
    updateTrigger(newPost);
    setMsg((prev) => !prev);
    setTimeout(() => {
      setMsg(false);
    }, 1990);
    setTimeout(() => {
      router.push('/blog');
    }, 2000);
  };

  const { title, body, id } = data;

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
