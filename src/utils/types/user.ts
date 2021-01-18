import { Post } from "./post";
export interface User {
  __typename: "User";
  id?: string;
  username?: string;
}
export type UserProfile = User & {
  name?: string;
  website?: string;
  gender?: string;
  image_url?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  followers?: UserProfile[];
  following?: UserProfile[];
  posts?: Post[];
};
