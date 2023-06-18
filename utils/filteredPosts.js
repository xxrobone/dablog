export const filteredPosts = (query, posts) => {
  if (!query) {
    return posts;
  }
  return posts.filter((post) => post.title.includes(query));
};
