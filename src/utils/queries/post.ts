import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "../fragments/post";
import { COMMENT_FRAGMENT } from "../fragments/comment";

export const GET_POST = gql`
  query getPost($id: String!) {
    post(id: $id) {
      ...PostFragment
      comments(count: null) {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($id: String!) {
    post(id: $id) {
      id
      caption
      created_at
      user {
        id
        username
        image_url
      }
      comments(count: null) {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const GET_POST_LIKES = gql`
  query getPostLikes($id: String!) {
    post(id: $id) {
      id
      likes {
        id
        name
        username
        image_url
      }
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts(random: false, post_id: "") {
      ...PostFragment
      comments(count: 2) {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const GET_RANDOM_POSTS = gql`
  query {
    posts(random: true, post_id: "") {
      id
      image_urls
      commentsCount
      likesCount
    }
  }
`;

export const GET_USER_RELATED_POSTS = gql`
  query getUserRelatedPosts($id: String) {
    posts(random: false, post_id: $id) {
      id
      image_urls
      commentsCount
      likesCount
    }
  }
`;
