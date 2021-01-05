import { gql } from "@apollo/client";

export const RESEND_VERIFICATION_CODE = gql`
  mutation resendCode($email: String!) {
    resendCode(email: $email)
  }
`;
