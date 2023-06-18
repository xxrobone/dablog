import { supabase } from '@/lib/supabaseClient';
import { uploadImage } from '/utils/uploadImage';
export const cacheKey = '/api/blogs';

export const getPosts = async () => {
  const { data, error, status } = await supabase.from('posts').select('*');
  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
    .from('posts')
    .select()
    .single()
    .eq('slug', slug);

  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const addPost = async (_, { arg: newPost }) => {
  let image = '';

  if (newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from('posts')
    .insert({ ...newPost, image })
    .select()
    .single();

  if (error) {
    console.log(error, status);
  }
  return { data, error, status };
};

export const deletePost = async (_, { arg: id }) => {
  const { data, error, status } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const updatePost = async (_, { arg: { title, slug, body, id } }) => {
  const { data, error, status } = await supabase
    .from('posts')
    .update({ title, slug, body })
    .eq('id', id)
    .single();

  return { data, error, status };
};
