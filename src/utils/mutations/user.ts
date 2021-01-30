import { gql } from "@apollo/client";

export const DELETE_PROFILE_PIC = gql`
  mutation {
    deleteProfilePicture
  }
`;

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

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $password: String
    $new_password: String
    $new_password_confirmation: String
  ) {
    updatePassword(
      password: $password
      new_password: $new_password
      new_password_confirmation: $new_password_confirmation
    )
  }
`;

export const UPDATE_PROFILE_INFO = gql`
  mutation updateProfile(
    $website: String
    $gender: String
    $username: String
    $email: String
    $phone_no: String
    $bio: String
    $name: String
  ) {
    updateProfile(
      website: $website
      gender: $gender
      username: $username
      email: $email
      phone_no: $phone_no
      bio: $bio
      name: $name
    )
  }
`;

export const UPDATE_PROFILE_PIC = gql`
  mutation {
    updateProfilePicture
  }
`;
