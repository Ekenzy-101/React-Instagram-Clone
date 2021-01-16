import { gql } from "@apollo/client";

export const RESEND_VERIFICATION_CODE = gql`
  mutation resendCode($email: String!) {
    resendCode(email: $email)
  }
`;

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($id: String!) {
    toggleFollow(id: $id)
  }
`;
