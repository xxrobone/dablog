import BlogEditor from '@/components/blog-editor';
import { createSlug } from '@/utils/createSlug';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { addPost, cacheKey } from '../../api-routes/posts';

export default function CreatePost() {
  const { trigger: addTrigger, isMutating } = useSWRMutation(cacheKey, addPost);

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    const title = titleInput;
    const body = editorContent;

    const newPost = { title, body, slug }
    console.log({ title, body, slug });
    console.log('new Post:', newPost)
    addTrigger({ newPost });
  };

  return (
    <BlogEditor
      heading='Create post'
      onSubmit={handleOnSubmit}
      buttonText='Upload post'
    />
  );
}
