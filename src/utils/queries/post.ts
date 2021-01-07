import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($id: String!) {
    post(id: $id) {
      id
      image_urls
      caption
      created_at
      user {
        id
        username
        image_url
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
