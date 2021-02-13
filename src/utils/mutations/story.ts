import { gql } from "@apollo/client";

export const CREATE_STORY = gql`
  mutation createStory {
    createStory
  }
`;

export const DELETE_STORY = gql`
  mutation deleteStory($id: String!) {
    deleteStory(id: $id)
  }
`;
