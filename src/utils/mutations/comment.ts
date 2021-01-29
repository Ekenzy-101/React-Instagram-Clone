import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($post_id: String!, $content: String!) {
    createComment(post_id: $post_id, content: $content) {
      id
      content
      created_at
      user {
        id
        username
        image_url
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id)
  }
`;

export const DELETE_REPLY = gql`
  mutation deleteReply($id: String!) {
    deleteReply(id: $id)
  }
`;

export const REPLY_COMMENT = gql`
  mutation createReply($comment_id: String!, $content: String!) {
    createReply(comment_id: $comment_id, content: $content) {
      id
      content
      created_at
      user {
        id
        username
        image_url
      }
    }
  }
`;

export const TOGGLE_COMMENT_LIKE = gql`
  mutation toggleCommentLike($id: String!) {
    toggleCommentLike(id: $id)
  }
`;

export const TOGGLE_REPLY_LIKE = gql`
  mutation toggleReplyLike($id: String!) {
    toggleReplyLike(id: $id)
  }
`;
