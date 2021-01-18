import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./user";

export const REPLY_FRAGMENT = gql`
  fragment ReplyFragment on ReplyComment {
    id
    content
    created_at
    user {
      id
      username
      image_url
    }
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on PostComment {
    id
    content
    created_at
    user {
      ...UserFragment
    }
    likes {
      ...UserFragment
    }
    replies {
      ...ReplyFragment
    }
  }
  ${USER_FRAGMENT}
  ${REPLY_FRAGMENT}
`;
