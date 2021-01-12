import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: String!) {
    post(id: $id) {
      id
      image_urls
      location
      caption
      created_at
      user {
        id
        username
        image_url
      }
      likes {
        id
      }
      comments {
        id
        content
        created_at
        user {
          id
          username
          image_url
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id
      image_urls
      location
      caption
      created_at
      user {
        id
        username
        image_url
      }
      likes {
        id
      }
      comments {
        id
        content
        created_at
        user {
          id
          username
          image_url
        }
      }
    }
  }
`;
