import { ApolloCache } from "@apollo/client";
import { GET_POST } from "../queries/post";
import { Post } from "../types/post";
import { User, UserProfile } from "../types/user";
import { debug } from "../services/debugService";

export const updatePostLikes = (
  cache: ApolloCache<any>,
  user: User,
  post: Post
) => {
  const newLike: UserProfile = {
    __typename: "User",
    id: user.id!,
  };

  // Whether User has liked the current post
  const isLiked = post.likes.some((l) => l.id === user?.id);

  debug.log("isLikePresent", isLiked);
  let newLikes: UserProfile[] = [];

  if (isLiked) {
    newLikes = post.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...post.likes, newLike];
  }

  debug.log("newLikes", newLikes);

  const data = {
    post: { ...post, likes: newLikes },
  };

  debug.log("data", data);

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};

export const updateCommentLikes = (
  cache: ApolloCache<any>,
  user: User,
  post: Post,
  commentId: string
) => {
  const newLike: UserProfile = {
    __typename: "User",
    id: user.id!,
  };
  // Whether User has liked the current current
  let comment = { ...post.comments.find((c) => c.id === commentId)! };
  const index = post.comments.findIndex((c) => c.id === commentId)!;
  const isLiked = comment.likes.some((l) => l.id === user?.id);

  debug.log("isLikePresent", isLiked);

  let newLikes: UserProfile[] = [];

  // Toggle Likes
  if (isLiked) {
    newLikes = comment.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...comment.likes, newLike];
  }

  comment = { ...comment, likes: newLikes };
  const comments = [...post.comments];
  comments.splice(index, 1, comment);

  debug.log("newLikes", newLikes);
  debug.log("comment", comment);
  debug.log("comments", comments);

  const data = {
    post: { ...post, comments },
  } as { post: Post };

  debug.log("data", data);

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};
