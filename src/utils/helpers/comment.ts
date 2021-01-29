import { ApolloCache } from "@apollo/client";
import { GET_POST } from "../queries/post";
import { PostComment, Post, ReplyComment } from "../types/post";

export const updatePostComments = (options: {
  cache: ApolloCache<any>;
  response: PostComment;
  post: Post;
}) => {
  const { cache, response, post } = options;
  const newComments: PostComment[] = [
    {
      ...response,
      user: { ...response.user, __typename: "User" },
      replies: [],
      likes: [],
      __typename: "PostComment",
    },
    ...post.comments,
  ];

  const data = {
    post: {
      ...post,
      comments: newComments,
      commentsCount: post.commentsCount + 1,
    },
  } as {
    post: Post;
  };

  cache.writeQuery({
    query: GET_POST,
    variables: { id: post.id },
    data,
  });
};

export const updatePostCommentReplies = (options: {
  cache: ApolloCache<any>;
  comment: PostComment;
  response: ReplyComment;
  post: Post;
}) => {
  const { cache, comment, post, response } = options;
  const index = post.comments.findIndex((c) => c.id === comment.id)!;

  const newReplies: ReplyComment[] = [
    {
      ...response,
      user: { ...response.user, __typename: "User" },
      __typename: "ReplyComment",
      likes: [],
    },
    ...comment.replies,
  ];

  const comments = [...post.comments];
  comments.splice(index, 1, { ...comment, replies: newReplies });
  const data = { post: { ...post, comments } } as {
    post: Post;
  };

  cache.writeQuery({
    query: GET_POST,
    variables: { id: post.id },
    data,
  });
};

export const deletePostComment = (options: {
  cache: ApolloCache<any>;
  post: Post;
  comment: PostComment;
}) => {
  const { cache, comment, post } = options;
  const newComments = post.comments.filter((c) => c.id !== comment?.id);

  const data = {
    post: {
      ...post,
      comments: newComments,
      commentsCount: post.commentsCount - 1,
    },
  } as { post: Post };

  cache.writeQuery({
    query: GET_POST,
    variables: { id: post.id },
    data,
  });
};

export const deleteReplyComment = (options: {
  cache: ApolloCache<any>;
  post: Post;
  comment: PostComment;
  reply: ReplyComment;
}) => {
  const { cache, post, comment, reply } = options;
  const newReplies = comment.replies.filter((r) => r.id !== reply?.id);
  const newComment = { ...comment, replies: newReplies } as PostComment;

  const commentIndex = post.comments.findIndex((c) => c.id === comment.id);
  const newComments = [...post.comments];
  newComments.splice(commentIndex, 1, newComment);

  const data = {
    post: { ...post, comments: newComments },
  } as { post: Post };

  cache.writeQuery({
    query: GET_POST,
    variables: { id: post.id },
    data,
  });
};

export const parseCommentDate = (value: string) => {
  let number = value[0];
  if (value.includes("second")) {
    number += "s";
  } else if (value.includes("minute")) {
    number += "m";
  } else if (value.includes("hour")) {
    number += "h";
  } else if (value.includes("day")) {
    number += "d";
  } else if (value.includes("week")) {
    number += "w";
  } else if (value.includes("year")) {
    number += "y";
  }
  return number;
};
