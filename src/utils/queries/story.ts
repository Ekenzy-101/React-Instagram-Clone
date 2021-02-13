import { gql } from "@apollo/client";

export const GET_STORIES = gql`
  query getStories {
    stories(username: null) {
      id
      image_url
      created_at
      user {
        id
        username
        image_url
      }
    }
  }
`;

export const GET_USER_STORIES = gql`
  query getStories($username: String) {
    stories(username: $username) {
      id
      image_url
      created_at
      user {
        id
        username
        image_url
      }
    }
  }
`;
