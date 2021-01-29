import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./user";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    image_urls
    location
    caption
    created_at
    commentsCount
    likes {
      ...UserFragment
    }
    saves {
      id
    }
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
