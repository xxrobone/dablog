import { supabase } from '@/lib/supabaseClient';

export const commentsCacheKey = 'api/comments';

export const getComments = async (id) => {
  // now just getting all the comments, then will have to get comments related to the post
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', id);

  if (error) {
    console.log(error, status);
  }
  console.log('data from supabase in api get comments: ', { data });
  return { data, error, status };
};

export const addComment = async (_, { arg: newComment }) => {
  const { data, error, status } = await supabase
    .from('comments')
    .insert(newComment);
  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const editComment = async (_, { arg: edited }) => {
  /*  console.log('edited comment:', edited.comment, edited.id); */
  const { data, error } = await supabase
    .from('comments')
    .update({
      comment: edited.comment,
      id: edited.id,
    })
    .eq('id', edited.id);
  if (!error && data) {
    return { data, error };
  } else {
    console.log(error?.message);
  }
};

export const deleteComment = async (_, { arg: id }) => {
  console.log('from deleteComment in comments api:', id);
  const { data, error, status } = await supabase
    .from('comments')
    .delete()
    .single()
    .eq('id', id);
  if (error) {
    console.log(error);
  }

  return { data, error, status };
};
