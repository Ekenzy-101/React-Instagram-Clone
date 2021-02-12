import { ApolloCache } from "@apollo/client";
import { GET_POST, GET_POSTS } from "../queries/post";
import { Post } from "../types/post";

export const deletePostFromCache = (options: {
  cache: ApolloCache<any>;
  post: Post;
}) => {
  const { cache, post } = options;

  const data = cache.readQuery({ query: GET_POSTS }) as
    | undefined
    | { posts: Post[] };
  if (data) {
    const posts = [...data.posts];
    const newPosts = posts.filter((p) => p.id !== post.id);

    cache.writeQuery({ query: GET_POSTS, data: { posts: newPosts } });
  }

  cache.writeQuery({ query: GET_POST, data: null, variables: { id: post.id } });
};
