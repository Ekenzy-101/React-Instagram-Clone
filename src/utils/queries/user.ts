import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments/user";

export const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String) {
    user(token: $token, username: null) {
      ...UserFragment
      email
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username, token: null) {
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
      savedPosts {
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
        ...UserFragment
      }
      following {
        ...UserFragment
      }
      followersCount
      followingCount
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER_FOLLOWERS = gql`
  query getUser($username: String!) {
    user(username: $username, token: null) {
      id
      followers {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USER_FOLLOWING = gql`
  query getUser($username: String!) {
    user(username: $username, token: null) {
      id
      following {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_AUTH_USER = gql`
  query {
    profile {
      ...UserFragment
      followers {
        id
      }
      following {
        id
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_AUTH_USER_INFO = gql`
  query {
    profile {
      id
      username
      name
      bio
      phone_no
      website
      image_url
      gender
      email
    }
  }
`;
