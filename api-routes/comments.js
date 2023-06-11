import { supabase } from '@/lib/supabaseClient';

export const getComments = async ({ id }) => {
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
/* 
export const addComment = async (comment) => {
  const { data, error, status } = await supabase.from('comments').insert({
    username: 'Rob One',
    comment: comment,
  });
  if (error) {
    console.log(error, status);
  }
  return { data, error, status };
}; */
export const addComment = async (
  _,
  { arg: { username, comment, post_id } }
) => {
  const { data, error, status } = await supabase
    .from('comments')
    .insert({ username, comment, post_id });
  if (error) {
    console.log(error, status);
  }
  /* console.log({ data }); */
  return { data, error, status };
};

export const editComment = async (_,
  { arg: { editComment } }) => {
  const { data, error } = await supabase
      .from("comments")
      .update({
        comment: editComment.body,
      })
      .match({ id: editComment.id });
    if (!error && data) {
      window.alert("Edited Comment!");
    } else {
      window.alert(error?.message);
    }
}

export const deleteComment = async ({ id }) => {
  console.log('fram deleteComment in comments api:', id)
      const { data, error } = await supabase.from("comments").delete().eq({ 'id': id });
      if (!error && data) {
        window.alert("Deleted Comment :)");
      } else {
        window.alert(error?.message);
      }
};
