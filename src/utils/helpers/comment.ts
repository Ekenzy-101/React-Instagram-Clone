import { ApolloCache } from "@apollo/client";
import { GET_POST } from "../queries/post";
import { PostComment, Post } from "../types/post";

export const updatePostComments = (
  cache: ApolloCache<any>,
  response: PostComment,
  post: Post
) => {
  const newComments: PostComment[] = [
    {
      ...response,
      user: { ...response.user, __typename: "User" },
      replies: [],
      __typename: "PostComment",
    },
    ...post.comments,
  ];

  const data = { post: { ...post, comments: newComments } } as {
    post: Post;
  };

  cache.writeQuery({
    query: GET_POST,
    variables: { id: post.id },
    data,
  });
};

export const deletePostComment = (
  cache: ApolloCache<any>,
  post: Post,
  activeComment: PostComment
) => {
  const newComments = post.comments.filter((c) => c.id !== activeComment?.id);

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
