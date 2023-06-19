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

export const updatePost = async (_, { arg: editedPost }) => {
  let image = editedPost?.image ?? '';

  const isNewImage = typeof image === 'object' && image !== null;

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(editedPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from('posts')
    .update({ ...editedPost, image })
    .select()
    .single()
    .eq('id', editedPost.id);

  return { error, status, data };
};

// will do the search on client side 
/* export const searchPosts = async (query) => {
  const { data, error, status } = await supabase
    .from('posts')
    .select('*')
    .textSearch('title', query, {
      type: 'websearch',
    });

  return { error, status, data };
}; */
