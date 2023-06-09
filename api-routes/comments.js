import { supabase } from '@/lib/supabaseClient';

export const getComments = async () => {
  // now just getting all the comments, then will have to get comments related to the post
  const { data, error } = await supabase.from('comments').select('*');

  if (error) {
    console.log(error, status);
  }
  console.log('data from supabase in api get comments: ', { data });
  return { data, error, status };
};

export const addComment = async (comment) => {
  const { data, error, status } = await supabase.from('comments').insert({
    username: 'Rob One',
    comment: comment,
  });

  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const removeComment = () => {
  //Handle remove comment here
};
