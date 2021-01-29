import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($count: Int!, $location: String, $caption: String) {
    createPost(count: $count, caption: $caption, location: $location)
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const TOGGLE_POST_LIKE = gql`
  mutation togglePostLike($id: String!) {
    togglePostLike(id: $id)
  }
`;

export const TOGGLE_POST_SAVE = gql`
  mutation togglePostSave($id: String!) {
    togglePostSave(id: $id)
  }
`;
