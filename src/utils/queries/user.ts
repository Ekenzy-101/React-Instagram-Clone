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
        commentsCount
      }
      website
      image_url
      followers {
        id
      }
      following {
        id
      }
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

export const GET_RELATED_USERS = gql`
  query {
    profile {
      id
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;
