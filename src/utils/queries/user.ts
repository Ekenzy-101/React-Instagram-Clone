import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      id
      name
      username
      bio
      posts {
        id
        image_urls
      }
      website
      image_url
      followersCount
      followingCount
    }
  }
`;
