import { gql } from "@apollo/client";

export const GET_STORIES = gql`
  query getStories {
    stories {
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
