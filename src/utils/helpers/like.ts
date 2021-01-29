import { ApolloCache } from "@apollo/client";
import { GET_POST } from "../queries/post";
import { Post } from "../types/post";
import { User } from "../types/user";
import { debug } from "../services/debugService";

export const updatePostLikes = (options: {
  cache: ApolloCache<any>;
  user: User | null;
  post: Post;
}) => {
  const { cache, user, post } = options;
  const newLike: User = {
    __typename: "User",
    id: user?.id!,
  };

  // Whether User has liked the current post
  const isLiked = post.likes.some((l) => l.id === user?.id);

  let newLikes: User[] = [];
  if (isLiked) {
    newLikes = post.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...post.likes, newLike];
  }

  const data = {
    post: { ...post, likes: newLikes } as Post,
  };

  debug.group("Toggle Post Likes");
  debug.log("isLikePresent", isLiked);
  debug.log("newLikes", newLikes);
  debug.log("data", data);
  debug.groupEnd();

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};

export const updatePostSaves = (options: {
  cache: ApolloCache<any>;
  user: User | null;
  post: Post;
}) => {
  const { cache, user, post } = options;
  const newSave: User = {
    __typename: "User",
    id: user?.id!,
  };

  const isSaved = post.saves.some((l) => l.id === user?.id);

  debug.group("Toggle Post Saves");
  debug.log("isSaved", isSaved);
  let newSaves: User[] = [];

  if (isSaved) {
    newSaves = post.saves.filter((l) => l.id !== user?.id);
  } else {
    newSaves = [...post.saves, newSave];
  }

  debug.log("newSaves", newSaves);

  const data = {
    post: { ...post, saves: newSaves },
  };

  debug.log("data", data);
  debug.groupEnd();

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};

export const updateCommentLikes = (options: {
  cache: ApolloCache<any>;
  user: User;
  post: Post;
  commentId: string;
}) => {
  const { cache, user, post, commentId } = options;
  const newLike: User = {
    __typename: "User",
    id: user.id!,
  };
  // Whether User has liked the current current
  let comment = { ...post.comments.find((c) => c.id === commentId)! };
  const index = post.comments.findIndex((c) => c.id === commentId)!;
  const isLiked = comment.likes.some((l) => l.id === user?.id);

  let newLikes: User[] = [];
  // Toggle Likes
  if (isLiked) {
    newLikes = comment.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...comment.likes, newLike];
  }

  comment = { ...comment, likes: newLikes };
  const comments = [...post.comments];
  comments.splice(index, 1, comment);

  const data = {
    post: { ...post, comments },
  } as { post: Post };

  debug.group("Toggle Comment Likes");
  debug.log("isLikePresent", isLiked);
  debug.log("newLikes", newLikes);
  debug.log("comment", comment);
  debug.log("comments", comments);
  debug.log("data", data);
  debug.groupEnd();

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};
export const updateReplyLikes = (options: {
  cache: ApolloCache<any>;
  user: User;
  post: Post;
  commentId: string;
  replyId: string;
}) => {
  const { cache, user, post, commentId, replyId } = options;
  const newLike: User = {
    __typename: "User",
    id: user.id!,
  };
  // Whether User has liked the current comment
  let comment = { ...post.comments.find((c) => c.id === commentId)! };
  let reply = { ...comment.replies.find((r) => r.id === replyId)! };
  const commentIndex = post.comments.findIndex((c) => c.id === commentId)!;
  const replyIndex = comment.replies.findIndex((r) => r.id === replyId);
  const isLiked = reply.likes.some((l) => l.id === user?.id);

  let newLikes: User[] = [];
  // Toggle Likes
  if (isLiked) {
    newLikes = reply.likes.filter((l) => l.id !== user?.id);
  } else {
    newLikes = [...reply.likes, newLike];
  }

  // Update the existing likes
  reply = { ...reply, likes: newLikes };
  const replies = [...comment.replies];
  // Update the specific reply
  replies.splice(replyIndex, 1, reply);
  // Update the existing replies
  comment = { ...comment, replies };
  const comments = [...post.comments];
  // Update the specific comment
  comments.splice(commentIndex, 1, comment);

  const data = {
    post: { ...post, comments },
  } as { post: Post };

  debug.group("Toggle Reply Likes");
  debug.log("isLikePresent", isLiked);
  debug.log("newLikes", newLikes);
  debug.log("reply", reply);
  debug.log("replies", replies);
  debug.log("comment", comment);
  debug.log("comments", comments);
  debug.log("data", data);
  debug.groupEnd();

  cache.writeQuery({ query: GET_POST, data, variables: { id: post.id } });
};
