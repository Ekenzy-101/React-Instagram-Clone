import { ApolloCache } from "@apollo/client";
import { GET_POST, GET_POSTS } from "../queries/post";
import { Post } from "../types/post";
import { User, UserProfile } from "../types/user";
import { debug } from "../services/debugService";

export const updatePostsLikes = (
  cache: ApolloCache<any>,
  user: User,
  post: Post
) => {
  const newLike: UserProfile = {
    __typename: "User",
    id: user?.id,
  };

  let data = cache.readQuery({ query: GET_POSTS }) as {
    posts: Post[];
  };

  // Find The Current Post
  const currentPost = data.posts.find((p) => p.id === post.id)!;
  const index = data.posts.findIndex((p) => p.id === post.id)!;
  const otherPosts = data.posts.filter((p) => p.id !== post.id);

  debug.log("Existing Post", currentPost);

  // Whether User has liked the current post
  const isLiked = currentPost.likes.some((l) => l.id === user?.id);

  debug.log("isLikePresent", isLiked);
  let newLikes: UserProfile[] = [];

  if (isLiked) {
    newLikes = currentPost.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...currentPost.likes, newLike];
  }

  debug.log("newLikes", newLikes);

  const newPosts = [...otherPosts];
  newPosts.splice(index, 0, { ...currentPost, likes: newLikes });

  data = {
    posts: newPosts,
  };

  debug.log("data", data);

  cache.writeQuery({ query: GET_POSTS, data });
};

export const updatePostLikes = (
  cache: ApolloCache<any>,
  user: User,
  id: string
) => {
  const newLike: UserProfile = {
    __typename: "User",
    id: user.id!,
  };

  let data = cache.readQuery({ query: GET_POST, variables: { id } }) as {
    post: Post;
  };

  // Whether User has liked the current post
  const isLiked = data.post.likes.some((l) => l.id === user?.id);

  debug.log("isLikePresent", isLiked);
  let newLikes: UserProfile[] = [];

  if (isLiked) {
    newLikes = data.post.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...data.post.likes, newLike];
  }

  debug.log("newLikes", newLikes);

  data = {
    post: { ...data.post, likes: newLikes },
  };

  debug.log("data", data);

  cache.writeQuery({ query: GET_POST, data, variables: { id } });
};
