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
        likes {
          id
        }
        comments {
          id
        }
      }
      website
      image_url
      followersCount
      followingCount
    }
  }
`;

export const GET_AUTH_USER = gql`
  query {
    profile {
      id
      username
    }
  }
`;
