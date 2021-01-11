import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($count: Int!, $location: String, $caption: String) {
    createPost(count: $count, caption: $caption, location: $location)
  }
`;
